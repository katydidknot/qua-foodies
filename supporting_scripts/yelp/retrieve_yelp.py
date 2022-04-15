import json
import pandas as pd
import requests

#Retrieve data from yelp 
keys = ['gwFDSRzJYLFPWyKaZBxgR7LFc2j5YKtB8CNsWzaaffNqbl5QkBW53QFQ5epqi91Oi-stHecFAWNaEvmT_TYCMnlrjBW1BesEh2uH2NM58ViZOKxAihhUh34Ct-5KYnYx', 
        'HZNyhchzhK7skaiTrkl7fbpbvdReXwF9jAqXu4fdlLvTVvH0VqQT3JCDogIjwh1gpGaASYFseeWR2aGqebQ5_rR-VbFGKkgX0nXHvXNxq1PVFSrhSUUfxRf7B6UoYnYx',
        'KqoKGvQNTnyRWwWuAQ9qtrE4hZBePv5p1LQy7zj0iZghriRWnLxOaSj6OP9hD0LY04h5TFTJ9xjNRWuZTZZdWL7nIkchHqV2mQ6CQL04MdM_JYUm03PGJXhQESQ5YnYx',
        'LKAlakxpeUMtLZKKw7osHBCbkF99yue0nfkUqccxceRzqSI7643L2PsMSKEot1KmK5NjTJbuSXVFn3ot-LHYU7L6EB8Qf5atl_OFSTl11837CgrPPuGmvdRhDo5PYnYx']
key_index = 0

url = "https://api.yelp.com/v3"
records = []
path_list_0 = ['businesses_0.txt','businesses_1.txt', 'businesses_2.txt', 'businesses_3.txt'] 
#path_list_1 = ['businesses_4.txt','businesses_5.txt','businesses_6.txt','businesses_7.txt']
#path_list_2 = ['businesses_8.txt','businesses_9.txt','businesses_10.txt','businesses_11.txt']
#path_list_4 = ['businesses_12.txt','businesses_13.txt']

def retrieve_data(request_url, headers, key_index):
    try: 
        response = requests.get(request_url, headers=headers)
        if "ACCESS_LIMIT_REACHED" in response.text:
            raise Exception
        return response, key_index
    except:
        print(keys[key_index])
        key_index = key_index + 1
        if key_index > len(keys)-1:
            return None, key_index
        headers = {'Authorization' : 'Bearer {key}'.format(key=keys[key_index])}
        return retrieve_data(request_url, headers, key_index)

for file in path_list_0:        
    with open('./bid/{file}'.format(file=file), 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines:
            bid = line.strip()
            request_url = url + "/businesses/{id}".format(id=bid)
            if key_index > len(keys)-1:
                break
            headers = {'Authorization' : 'Bearer {key}'.format(key=keys[key_index])}
            response, key_index = retrieve_data(request_url, headers, key_index)
            try:
                records.append(pd.json_normalize(json.loads(response.text)))
            except:
                continue
try:
    records_df = pd.concat(records)
    records_df = records_df.filter(items=["id", "name", "is_closed", "display_phone", 
                                            "review_count", "categories", "rating", 
                                            "price", "transactions", "location.address1", 
                                            "location.address2", "location.address3", "location.city", 
                                            "location.zip_code", "location.country", "location.state", 
                                            "location.display_address", "location.cross_streets", 
                                            "coordinates.latitude", "coordinates.longitude"])
    records_df.to_csv("./raw_data/0.csv")
except:
    print("Unable to output data")