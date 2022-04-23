import requests
url = 'http://localhost:5000/api'
r = requests.post(url,json={
	'zipCode':'28117', #zip
	'rating':'2.5',
	'price':'1',
	'pickup':'0',
	'delivery':'0',
	'reservations':'0', #restaurant_reservation
	'hotdogs':'0',
	'pizza':'0',
	'traditionalAmerican':'0', #tradamerican
	'sandwiches':'0',
	'burgers':'0',
	'coffee':'0',
	'mexican':'0',
	'brunch':'0', #breakfast_brunch
	'newAmerican':'0', #newamerican
	'italian':'0',
	'chinese':'0',
	'bar':'0', #bars  #sportsbars
	'chickenWings':'0', #chicken_wings
	'iceCream':'0', #icecream
	'seafood':'0',
	'bakery':'0', #bakeries
	'salad':'0',
	'desserts':'0',
	'delis':'0',
	'japanese':'0',
	'bbq':'0',
	'juiceBar':'0', #juicebars
	'cafe':'0', #cafes
	'mediterranean':'0',
	'steak':'0',
	'asianfusion':'0',
	'vegetarian':'0',
	'vegan':'0'
		})
print(r.json())