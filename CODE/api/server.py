from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np


#created the instance of the Flask()
app = Flask(__name__)


#load the model
model = pickle.load(open('../baseline_models_2/xgb_cl.p','rb'))
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

#get zipcode keyed feature data - will join later to enrich features passed in from the request
data = pd.read_csv('../baseline_models_2/covid_restaurant_full_post_VIF_loc.csv')
location_data = data[['zip','total_restaurants_zip','Total_Reviews_Zip','Average_Rating_Zip','Average_Price_Zip','business_ratio','Rural_urban_continuum_code_2013','Metro_2013','Unemployment_rate_2020','covid_high','covid_low','covid_moderate','SizeRank','zillow_sfh_sale_price']]
location_df_uniq = location_data.drop_duplicates()
location_df_uniq['zip'] = location_df_uniq['zip'].astype(int)
location_df_uniq.set_index('zip')

#predict method gets the data from the json passed by the requestor
@app.route('/api',methods=['POST'])
def predict():
	data = request.get_json(force=True)
	request_data = 	[[data['zipCode'], #zip
	data['rating'],
	data['price'],
	data['pickup'],
	data['delivery'],
	data['reservations'], #restaurant_reservation
	data['hotdogs'],
	data['pizza'],
	data['traditionalAmerican'], #tradamerican
	data['sandwiches'],
	data['burgers'],
	data['coffee'],
	data['mexican'],
	data['brunch'], #breakfast_brunch
	data['newAmerican'], #newamerican
	data['italian'],
	data['chinese'],
	data['bar'], #bars
	0, # 'sportsbars'
	data['chickenWings'], #chicken_wings
	data['iceCream'], #icecream
	data['seafood'],
	data['bakery'], #bakeries
	data['salad'],
	data['desserts'],
	data['delis'],
	data['japanese'],
	data['bbq'],
	data['juiceBar'], #juicebars
	data['cafe'], #cafes
	data['mediterranean'],
	data['steak'],
	data['asianfusion'],
	data['vegetarian'],
	data['vegan']]]

	request_array = np.array(request_data)

	request_df = pd.DataFrame(request_array, columns = ['zip','rating','price','pickup','delivery','restaurant_reservation','hotdogs','pizza','tradamerican','sandwiches','burgers','coffee','mexican','breakfast_brunch','newamerican','italian','chinese','bars','sportsbars','chicken_wings','icecream','seafood','bakeries','salad','desserts','delis','japanese','bbq','juicebars','cafes','mediterranean','steak','asianfusion','vegetarian','vegan'])
	
	#join location and request data on zipcode
	request_df['zip'] = request_df['zip'].astype(int)
	request_df.set_index('zip')
	enriched_request_df = request_df.merge(location_df_uniq, on='zip')

	#remove zipcode and ensure proper ordering
	enriched_request_df_final = enriched_request_df[['rating','price','pickup','delivery','restaurant_reservation','total_restaurants_zip','Total_Reviews_Zip','Average_Rating_Zip','Average_Price_Zip','hotdogs','pizza','tradamerican','sandwiches','burgers','coffee','mexican','breakfast_brunch','newamerican','italian','chinese','bars','chicken_wings','icecream','seafood','sportsbars','bakeries','salad','desserts','delis','japanese','bbq','juicebars','cafes','mediterranean','steak','asianfusion','vegetarian','vegan','business_ratio','Rural_urban_continuum_code_2013','Metro_2013','Unemployment_rate_2020','covid_high','covid_low','covid_moderate','SizeRank','zillow_sfh_sale_price']]
	
	#set types
	enriched_request_df_final = enriched_request_df_final.astype({'rating':'float','price':'int','pickup':'int','delivery':'int','restaurant_reservation':'int','total_restaurants_zip':'int','Total_Reviews_Zip':'int','Average_Rating_Zip':'float','Average_Price_Zip':'float','hotdogs':'int','pizza':'int','tradamerican':'int','sandwiches':'int','burgers':'int','coffee':'int','mexican':'int','breakfast_brunch':'int','newamerican':'int','italian':'int','chinese':'int','bars':'int','chicken_wings':'int','icecream':'int','seafood':'int','sportsbars':'int','bakeries':'int','salad':'int','desserts':'int','delis':'int','japanese':'int','bbq':'int','juicebars':'int','cafes':'int','mediterranean':'int','steak':'int','asianfusion':'int','vegetarian':'int','vegan':'int','business_ratio':'int','Rural_urban_continuum_code_2013':'int','Metro_2013':'int','Unemployment_rate_2020':'float','covid_high':'int','covid_low':'int','covid_moderate':'int','SizeRank':'int','zillow_sfh_sale_price':'int'})

	prediction = model.predict(enriched_request_df_final)
	output = prediction[0]

	return jsonify(result=str(output))


#run server
if __name__ == '__main__':
	app.run(port=5000, debug=True)
