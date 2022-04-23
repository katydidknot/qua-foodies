import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle


dataset = pd.read_csv('test_data.csv')
X = dataset.iloc[:, 1:].values
#print(X)
y = dataset.iloc[:, 0].values
#print(y)


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.33, random_state = 0)

regressor = LinearRegression()
regressor.fit(X_train, y_train)
y_pred = regressor.predict(X_test)


pickle.dump(regressor, open('model.pkl','wb'))

model = pickle.load(open('model.pkl','rb'))
#'review_count':20,'rating':4,'price':1,'pickup':1,'delivery':1
print(model.predict([[20,4,1,1,1]]))