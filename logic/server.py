from flask import Flask, request
from flask_cors import CORS
import tokenize
import io

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/', methods=['POST'])
def calculate():
    data = request.get_json()
    expression = data['expression']

    try:
        result = eval(expression)
        lex_result = list(tokenize.generate_tokens(io.StringIO(expression).readline))
        lex_result = [token.string for token in lex_result if token.type != tokenize.ENDMARKER]
    except:
        result = "Error"
        lex_result = []

    return {'result': result, 'lex_result': lex_result}

if __name__ == "__main__":
    app.run(debug=True)