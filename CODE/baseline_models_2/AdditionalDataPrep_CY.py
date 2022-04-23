# -*- coding: utf-8 -*-
"""
Created on Sun Apr 10 15:37:45 2022

@author: Christine
"""

import pandas as pd
pd.set_option('display.max_columns', 10)
pd.set_option('display.max_rows', 200)

'''Read in Unemployment Report'''

unemploy_df = pd.read_csv('D:/Documents/Georgia Tech/CSE6242 - Data and Visual Analytics/Group Project/Data/Unemployment.csv')
unemploy_df.head(15)

#Filter out those with a missing rural_urban_continuum_code_2013, this should take out all the states/US level data and only leave FIPS-level
#Filter out all Puerto Rico
unemploy_df = unemploy_df[unemploy_df.Rural_urban_continuum_code_2013.notnull()]
unemploy_df = unemploy_df[unemploy_df['State']!= 'PR']

#Convert Rural, Urban, and Metro variables into ints, and median household income into numeric
unemploy_df.dtypes
unemploy_df = unemploy_df.astype({"Rural_urban_continuum_code_2013":'int', "Urban_influence_code_2013":'int', "Metro_2013":'int'})
unemploy_df = unemploy_df.astype({"FIPS_Code":'str'})
unemploy_df.dtypes

'''Read in zip-fips crosswalk table'''

fips_xwalk = pd.read_csv('D:/Documents/Georgia Tech/CSE6242 - Data and Visual Analytics/Group Project/Data/ZIP_COUNTY_122021.csv')
fips_xwalk.dtypes
fips_xwalk.head(15)

#FIlter out all Puerto Rico
fips_xwalk = fips_xwalk[fips_xwalk['usps_zip_pref_state']!= 'PR']

#Rename County to FIPS_code and bus_ratio to business_ratio and keep only zip, fips, and business ratio
fips_xwalk.rename(columns={'county':'FIPS_Code', 'bus_ratio': 'business_ratio' }, inplace=True)
fips_xwalk = fips_xwalk[['zip', 'FIPS_Code', 'business_ratio']]
fips_xwalk = fips_xwalk.astype({"FIPS_Code":'str'})
fips_xwalk.dtypes

'''Merge variables in unemployment Report to the fips_xwalk'''
df_1 = fips_xwalk.merge(unemploy_df, on='FIPS_Code', how='left')

#Check for missings - There are 40 zip codes that had a FIPS code not in the unemployment Report, remove these
df_1.isnull().sum()
df_1[df_1['State'].isnull()]
df_1 = df_1[df_1.State.notnull()]
df_1.isnull().sum()

'''Read in COVID-19 Community Transmission Data'''

covid_transm = pd.read_csv('D:/Documents/Georgia Tech/CSE6242 - Data and Visual Analytics/Group Project/Data/United_States_COVID-19_County_Level_of_Community_Transmission_as_Originally_Posted.csv')
covid_transm.dtypes
covid_transm.head(15)

#Rename fips_code for easier merging to df_1. Create indicator variables for community_transmission_level 
covid_transm.rename(columns={'fips_code':'FIPS_Code'}, inplace=True)
covid_transm = covid_transm.astype({"FIPS_Code":'str'})
covid_transm['report_date'] = pd.to_datetime(covid_transm['report_date'])
covid_transm_2 = pd.get_dummies(covid_transm, prefix='covid', prefix_sep='_', columns = ['community_transmission_level'])
covid_transm_2.dtypes

#Filter out Puerto Rico and take the latest report date by sorting and removing duplicates
covid_transm_2= covid_transm_2[covid_transm_2['state_name']!= 'Puerto Rico']

covid_transm_2 = covid_transm_2.sort_values(by=['FIPS_Code', 'report_date'], ascending=[True, False])
covid_transm_3 = covid_transm_2.drop_duplicates(subset=['FIPS_Code'], keep='first')

#Keep only fips and indicators variables
covid_transm_3 = covid_transm_3[['FIPS_Code', 'covid_high', 'covid_low', 'covid_moderate', 'covid_substantial']]
covid_transm_3.dtypes

'''Merge COVID-19 transmission data to the intermediate df_1'''
df_2 = df_1.merge(covid_transm_3, on='FIPS_Code', how='left')
df_2.isnull().sum()

'''Read in COVID-19 Vaccinations Data'''

covid_vacc = pd.read_csv('D:/Documents/Georgia Tech/CSE6242 - Data and Visual Analytics/Group Project/Data/COVID-19_Vaccinations_in_the_United_States_County.csv')
covid_vacc.dtypes
covid_vacc.head(15)

#Rename fips_code for easier merging to df_2. Filter out Puerto Rico, Guam, and VI, and Unknown FIPS, sort and take latest date
covid_vacc.rename(columns={'FIPS':'FIPS_Code'}, inplace=True)
covid_vacc = covid_vacc[covid_vacc['Recip_State'] != 'PR']
covid_vacc = covid_vacc[covid_vacc['Recip_State'] != 'VI']
covid_vacc = covid_vacc[covid_vacc['Recip_State'] != 'GU']
covid_vacc = covid_vacc[covid_vacc['FIPS_Code']!= 'UNK']
covid_vacc = covid_vacc.astype({"FIPS_Code":'str'})
covid_vacc['Date'] = pd.to_datetime(covid_vacc['Date'])

#An extra zero is being imported in on some FIPS_Codes, add code to fix
covid_vacc['FIPS_Code'] = covid_vacc['FIPS_Code'].str.lstrip('0')
covid_vacc['FIPS_Code'] = covid_vacc['FIPS_Code'].str.strip()

#Keep only fips and vaccination completeness percent variables
covid_vacc_2= covid_vacc_2[['FIPS_Code', 'Completeness_pct']]
covid_vacc_2.dtypes
covid_vacc_2.head(15)

'''Merge COVID-19 vaccinations data to the intermediate df_2'''
df_3 = df_2.merge(covid_vacc_2, on='FIPS_Code', how='left')
df_3.isnull().sum()
df_3[df_3['Completeness_pct'].isnull()]
df_3.dtypes

#Change zip to str to prepare for merging with Yelp data
df_3 = df_3.astype({"zip":'str'})
df_3.dtypes

'''Pull Main Yelp Dataset'''
yelp_df = pd.read_csv('D:/Documents/Georgia Tech/CSE6242 - Data and Visual Analytics/Group Project/Data/yelp_data_final.csv')
yelp_df.dtypes

yelp_df_2 = yelp_df[['id', 'name', 'is_closed', 'review_count', 'rating', 'price', 'pickup', 'delivery', 'restaurant_reservation',\
                   'location.zip_code']]
yelp_df_2.dtypes
    
#Check for missings - 11 missing zips, filter them out, convert zip code into an int
yelp_df_2 = yelp_df_2[yelp_df_2['location.zip_code'].notnull()]
yelp_df_2.isnull().sum()
yelp_df_2 = yelp_df_2.astype({"location.zip_code":'int'})
yelp_df_2 = yelp_df_2.astype({"location.zip_code":'str'})
yelp_df_2.dtypes

#Rename zip code to zip
yelp_df_2.rename(columns={'location.zip_code':'zip'}, inplace=True)

'''Create density and grouped zip type variables'''
d = {'id': 'total_restaurants_zip', 'review_count':'Total_Reviews_Zip', 'rating':'Average_Rating_Zip','price':'Average_Price_Zip'}
yelp_groups = yelp_df_2.groupby('zip').agg({'id':'count','review_count':'sum', 'rating':'mean','price':'mean'}).rename(columns=d)

'''Merge Groups Dataset to Main Yelp Dataset'''
yelp_df_3 = yelp_df_2.merge(yelp_groups, on='zip', how='left')
yelp_df_3.isnull().sum()

'''Pull Yelp Categories Dataset'''
yelp_categories = pd.read_csv('D:/Documents/Georgia Tech/CSE6242 - Data and Visual Analytics/Group Project/Data/yelp_data_categories_final.csv')
yelp_categories.isnull().sum()
yelp_categories.dtypes

'''Merge Categories Dataset ton Main Yelp Dataset'''
yelp_final = yelp_df_3.merge(yelp_categories, on='id', how='left')
yelp_final.isnull().sum()

#Look at the two is_closed variables - All of them were equal so only keep one
yelp_final[yelp_final['is_closed_x'] != yelp_final['is_closed_y']]
yelp_final = yelp_final.drop(columns='is_closed_y')
yelp_final.rename(columns={'is_closed_x':'is_closed'}, inplace=True)


'''Merge additional data, intermediate data df_3, to Yelp data'''
df_4 = yelp_final.merge(df_3, on='zip', how='left')
df_4.isnull().sum()

#Seeing duplicates as there are some zip codes that can map to more than one fips code. Unfortunately there is no good way of defining
#exactly which fips code it should belong in, unless we do a search on each of the addresses specifically. There is limitations to this
#as software that lets you look up by address needs to have paid subscription. For our purposes, we wil take the first occurence of each.
dups = df_4.duplicated(subset='id', keep=False)
df_notdups = df_4[~dups]

df_5 = df_4.drop_duplicates(subset=['id'], keep='first')

#Look at the missing data (did not match to a FIPS code). Determined that these zips were not in the xwalk dataset, go ahead and remove
#the 63 restaurants
df_5.isnull().sum()
yelp_missing_fips = df_5[df_5['FIPS_Code'].isnull()]
yelp_missing_fips[['zip', 'FIPS_Code']]

df_5 = df_5[df_5['FIPS_Code'].notnull()]
df_5.isnull().sum()
#One still missing completeness percent, go ahead and remove


#Remove State from area_name
df_5['Area_name'] = df_5.apply(lambda x: x['Area_name'][:-4], axis = 1)

'''Merge in cleaned county-level Real-Estate data'''
re_df1 = pd.read_csv('D:/Documents/Georgia Tech/CSE6242 - Data and Visual Analytics/Group Project/Data/real_estate_features.csv')
re_df1.dtypes

#Convert number sold and days on market to int
re_df1= re_df1.astype({"redfin_days_on_market":'Int64', 'redfin_homes_sold': 'Int64'})
re_df1.rename(columns={'fips':'FIPS_Code'}, inplace=True)
re_df1 = re_df1.astype({"FIPS_Code":'str'})
re_df1.dtypes

'''Merge real estate data to df_5 to get final integrated data'''
df_final = df_5.merge(re_df1, on='FIPS_Code', how='left')
df_final.isnull().sum()

#Check the dups - Seeing duplicate fips codes in the real estate dataset, since it's possible that one fips code might have more than one
#zip code. Since there are limitations just due to the not 1-1 mapping nature of zip code and fips code, take first occurence of the ones 
#that have duplicates. In adddition, important to note that there may be missings for some of this real-estate data. Since our app is 
#tested on Arizona, we handmapped those that had missing FIPS just for Arizona, otherwise, there were 16 missing for other states. 
#Since this was a low amount, removed the 16 data points that had missing redfin data.
dups_2 = df_final.duplicated(subset='id', keep=False)
df_dups2 = df_final[dups_2]

df_final2 = df_final.drop_duplicates(subset=['id'], keep='first')
df_final2.isnull().sum()
df_final2 = df_final2[df_final2['redfin_sale_price'].notnull()]
df_final2.isnull().sum()

'''Export final dataset to csv'''
df_final2.to_csv('D:/Documents/Georgia Tech/CSE6242 - Data and Visual Analytics/Group Project/Data Prep and Modeling/covid_restaurant_integrated_data.csv')