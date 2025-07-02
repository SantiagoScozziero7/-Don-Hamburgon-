from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')


@app.route('/delivery')
def delivery():
    return render_template('delivery.html')


@app.route('/contacto')
def contacto():
    return render_template('contacto.html')


@app.route('/carrito')
def carrito():
    return render_template('carrito.html')


@app.route('/sanguchon')
def sanguchon():
    return render_template('sanguchon.html')


@app.route('/hamburgon')
def hamburgon():
    return render_template('hamburgon.html')


@app.route('/inicioSesion')
def inicio_sesion():
    return render_template('inicioSesion.html')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
