from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from flask_mysqldb import MySQL


app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'users_hamburgon'

mysql = MySQL(app)

app.secret_key = 'tu_clave_secreta'  # Necesario para usar sesiones

# --- API: CRUD para Contacto ---


@app.route('/api/contacto', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api_contacto():
    cur = mysql.connection.cursor()
    if request.method == 'GET':
        cur.execute("SELECT * FROM contacto")
        contactos = cur.fetchall()
        cur.close()
        return jsonify(contactos)
    elif request.method == 'POST':
        data = request.get_json()
        nombre = data.get('nombre')
        email = data.get('email')
        mensaje = data.get('mensaje')
        cur.execute(
            "INSERT INTO contacto (nombre, email, mensaje) VALUES (%s, %s, %s)", (nombre, email, mensaje))
        mysql.connection.commit()
        cur.close()
        return jsonify({'status': 'Contacto creado'}), 201
    elif request.method == 'PUT':
        data = request.get_json()
        id = data.get('id')
        mensaje = data.get('mensaje')
        cur.execute("UPDATE contacto SET mensaje=%s WHERE id=%s",
                    (mensaje, id))
        mysql.connection.commit()
        cur.close()
        return jsonify({'status': 'Contacto actualizado'})
    elif request.method == 'DELETE':
        data = request.get_json()
        id = data.get('id')
        cur.execute("DELETE FROM contacto WHERE id=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({'status': 'Contacto eliminado'})

# --- API: CRUD para Registros (Usuarios) ---


@app.route('/api/registros', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api_registros():
    cur = mysql.connection.cursor()
    if request.method == 'GET':
        cur.execute("SELECT * FROM registros")
        registros = cur.fetchall()
        cur.close()
        return jsonify(registros)
    elif request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        genero = data.get('genero')
        cur.execute("INSERT INTO registros (name, last_name, email, password, genero) VALUES (%s, %s, %s, %s, %s)",
                    (name, last_name, email, password, genero))
        mysql.connection.commit()
        cur.close()
        return jsonify({'status': 'Registro creado'}), 201
    elif request.method == 'PUT':
        data = request.get_json()
        id = data.get('id')
        email = data.get('email')
        cur.execute("UPDATE registros SET email=%s WHERE id=%s", (email, id))
        mysql.connection.commit()
        cur.close()
        return jsonify({'status': 'Registro actualizado'})
    elif request.method == 'DELETE':
        data = request.get_json()
        id = data.get('id')
        cur.execute("DELETE FROM registros WHERE id=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({'status': 'Registro eliminado'})


@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT * FROM registros WHERE email=%s AND password=%s", (email, password))
    user = cur.fetchone()
    cur.close()
    if user:
        # Asumiendo que el nombre está en la columna 1
        session['user_name'] = user[1]
        session['user_email'] = user[3]  # Ajusta el índice según tu tabla
        return jsonify({'success': True, 'message': 'Inicio de sesión exitoso', 'name': user[1]})
    else:
        return jsonify({'success': False, 'message': 'Credenciales incorrectas'}), 401


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/add_user', methods=['POST'])
def add_user():
    from flask import request
    name = request.form['name']
    last_name = request.form['last_name']
    email = request.form['email']
    password = request.form['password']
    genero = request.form['genero']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO contacts (name, last_name, email, password, genero) VALUES (%s, %s, %s, %s, %s)",
                (name, last_name, email, password, genero))
    mysql.connection.commit()
    cur.close()

    return redirect(url_for('index'))


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


@app.route('/inicioSesion', methods=['GET', 'POST'])
def inicioSesion():
    error = None
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT * FROM registros WHERE email=%s AND password=%s", (email, password))
        user = cur.fetchone()
        cur.close()
        if user:
            session['user_name'] = user[1]  # Ajusta el índice si es necesario
            session['user_email'] = user[3]
            return redirect(url_for('index'))
        else:
            error = "Credenciales incorrectas"
    return render_template('inicioSesion.html', error=error)


@app.route('/fincompra', methods=['GET', 'POST'])
def fincompra():
    return render_template('fincompra.html')


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(debug=True, port=5000)
