# Prueba Nivelación: Backend

El siguiente proyecto detecta si una persona tiene diferencias genéticas basándose en su secuencia de ADN.  
Recibe como parámetro un array de Strings que representan cada fila de una tabla

de (NxN) con la secuencia del ADN y devuelve si hubo o no mutaciones. Las letras de los Strings solo pueden ser: (A,T,C,G), las
cuales representan cada base nitrogenada del ADN.

## EndPoints:

### **POST** -> api/mutation
```json5
{

"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]

}
```

**Respuesta**

* HTTP 200-OK: Si se detecta una mutación.
* HTTP 403-Forbidden: Si no se detecta una mutación.
* HTTP 400-Bad Request: Si el arreglo no tiene el formato correcto (i.e no es un arreglo  NxN, posee caracteres invalidos).
* HTTP 422-Unprocessable Entity: Si el contenido del request es inválido (i.e posee el arreglo de dnas, o el arreglo no es de strings). 

```json5
{
    "hasMutation": false,
    "dna": [
        "ACAAAC",
        "CTGTTA",
        "CTGCAC",
        "ACGGAG",
        "GGGCAA",
        "GGGCGT"
    ]
}

```



### **GET** -> api/stats

**Respuesta**

* HTTP 200-OK

```json5

{
  "count_mutations": 6,
  "count_no_mutations": 16,
  "ratio": 0.375
}

```




## Ejecución:

### Desarrollo:

```text
> npm run dev
```
>**NOTA:** Se debe tener ejecutando en forma local un servidor MongoDB.  
> Se debe colocar en el archivo ```development.env```` el string de conexión para la base de datos.  
> ```text
> NODE_ENV=development
> HOST=localhost
> PORT=3000
> DB_CONNECTION_URL=mongodb://localhost/mutation_db
>```


### Pruebas:
```text
> npm test
```

ó

```text
> npm run test-coverage
```

> **NOTA:** Se debe tener ejecutando en forma local un servidor MongoDB.  
> La suit de pruebas va generar y utilizar la base de datos ```mutation`_db_TEST```.

### Production:



### **GET** -> api/stats
https://pruebaadn.herokuapp.com/api/stats

### **POST** -> api/mutation
https://pruebaadn.herokuapp.com/api/mutation
