from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle


#created the instance of the Flask()
app = Flask(__name__)


#load the model
model = pickle.load(open('model.pkl','rb'))
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

#predict method gets the data from the json passed by the requestor
@app.route('/api',methods=['POST'])
def predict():
    data = request.get_json(force=True)
    prediction = model.predict([[data['review_count'],data['rating'],data['price'],data['pickup'],data['delivery']]])
    output = prediction[0]
    return jsonify(output)


#run server
if __name__ == '__main__':
    app.run(port=5000, debug=True)
