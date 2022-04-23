import pandas as pd
import json
import collections

path = "./yelp_data.csv"

#Read data
df = pd.read_csv(path)

#Convert is_closed to 1 or 0 
df['is_closed'] = df['is_closed'].astype(int)

#Create Pickup / Delivery columns
df['pickup'] = df.transactions.str.contains('pickup').astype(int)
df['delivery'] = df.transactions.str.contains('delivery').astype(int)
df['restaurant_reservation'] = df.transactions.str.contains('restaurant_reservation').astype(int)

#Convert Price to Numerical column
df = df[df['price'].str.contains("$") == True]
price_map = {"$": 1, "$$" : 2, "$$$" : 3, "$$$$": 4}
df['price'] = df['price'].map(price_map)

#Create Indicator variables out of top 30 categories
def extract_categories(column):
    try:
        column = json.loads(column.replace('\'', '\"'))
        alias = []
        for i in column:
            alias.append(i['alias'])
        return ','.join(alias)
    except:
        return column
df.categories = df.categories.apply(extract_categories)
values = (','.join(df.categories)).split(',')
count_values = collections.Counter(values)
top_30 = count_values.most_common(30)
variables = []
for i in top_30:
    variables.append(i[0])
indicator_df = df.copy()
for v in variables:
    indicator_df[v] = indicator_df.categories.str.contains(v).astype(int)
indicator_df['vegetarian'] = indicator_df.categories.str.contains('vegetarian').astype(int)
indicator_df['vegan'] = indicator_df.categories.str.contains('vegan').astype(int)
variables = ['id', 'is_closed'] + variables + ['vegetarian', 'vegan']


#Output
indicator_df = indicator_df.filter(items=variables)
df = df.filter(items=["id", "name", "is_closed", "display_phone", 
                                        "review_count", "categories", "rating", 
                                        "price", "pickup","delivery", "restaurant_reservation", "location.address1", 
                                        "location.address2", "location.address3", "location.city", 
                                        "location.zip_code", "location.country", "location.state", 
                                        "location.display_address", "coordinates.latitude", "coordinates.longitude"])
df.to_csv("./yelp_data_final.csv", index=False)
indicator_df.to_csv("./yelp_data_categories_final.csv", index=False)