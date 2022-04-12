import requests
url = 'http://localhost:5000/api'
#r = requests.post(url,json={'exp':2.9,})
r = requests.post(url,json={'review_count':1,'rating':1,'price':1,'pickup':1,'delivery':1,})
print(r.json())