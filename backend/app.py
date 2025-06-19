from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/hello')
def hello():
    return jsonify({"message": "你好，来自 Flask 后端！"})

if __name__ == '__main__':
    app.run(debug=True) 