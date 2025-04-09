describe('Testing POST and PUT on Typicode', () => {

  it('Send first POST', () => {
    cy.request({
      method: "POST",
      url: 'https://jsonplaceholder.typicode.com/posts/',
      body:{
        userID: 1,
        title: 'API testing with cypress',
        body: 'First POST'
      }
    })
  });

  it('check log with cy.log on first POST', () => {
    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts/',
      {
        userID: 1, 
        title: 'API testing with cypress', 
        body: 'First POST'
      }
    ).then((response) => {
      cy.log(JSON.stringify(response.body));
    })
  });

  it('check response on first POST', () => {
    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts/',
      {
        userID: 1, 
        title: 'API testing with cypress', 
        body: null
      }
    ).then((response) => {
      const cuerpoDeLaRespuesta = response.body
      cy.log(JSON.stringify(cuerpoDeLaRespuesta));
      expect(response.status).to.eq(201);
      expect(response.body.title).to.be.a('string');
      expect(cuerpoDeLaRespuesta).to.have.property('title', 'API testing with cypress');
      expect(cuerpoDeLaRespuesta).to.have.property('body', null);
      expect(response.body).to.have.property('userID', 1);
      expect(response.body.userID).to.eq(1);
      expect(response.body.id).eq(101)
    });
  })

  it('Send "PUT" and check all the values modified on the response', () => {
    const post5 =  {
      userId: 1,
      id: 5,
      title: "nesciunt quas odio",
      body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    }
    const putBody =  {
      id: 5,
      body: 'first put'
    }
    cy.request('https://jsonplaceholder.typicode.com/posts/5').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.eq(post5);
    });
    cy.request('PUT', 'https://jsonplaceholder.typicode.com/posts/5',  putBody).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).deep.eq(putBody);
      });
   });

  it('Send first PATCH and check the response', () => {
  cy.request('PATCH', 'https://jsonplaceholder.typicode.com/posts/16', 
    {
      userId:1,
      id: 5,
      title: 'news', 
      body: 'first post',
    }
  ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title', 'news');
      expect(response.body.body).to.eq('first post');
      expect(response.body.userId).to.eq(1);
      expect(response.body).to.have.property('userId', 1);
      expect(response.body.id).to.eq(5);
    });
  });

  it('Send first DELETE method', () => {
    cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/1').then((response) => {
    expect(response.status).to.eq(200);
    })
   });

   it('All methods used in one test', () => {
    //Declaramos las variables a usar en los metodos POST, PUT y PATCH
    const postData = {
      "name": "Objeto creado por Javier Flores",
      "data": {
        "year": 2024,
        "price": 10,
        "CPU model": "Api testing with Cypress",
        "Hard disk size": "1 TB",
      }
    }
    const putData = {
      "name": "PUT update",
      "data": {
        "year": 2024,
        "price": 10,
        "CPU model": "PUT with Cypress",
        "Hard disk size": "1 TB"
      }
    }
    const patchData = {
      "name": "PATCH change",
      "data": {
        "CPU model": "Happy API testing with Cypress",
      }
    }
// Aqui hacemos un POST para crear un Objeto
    cy.request('POST', 'https://api.restful-api.dev/objects', postData)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include(postData);
// Con cy.wrap guardamos el valor de la ID para usarlo más adelante
        cy.wrap(response.body.id).as('objectID');
      });
    cy.get('@objectID').then((objectID) => {
      cy.log(objectID);
      cy.request('GET', `https://api.restful-api.dev/objects/${objectID}`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.include(postData);
      });
// // Aquí hacemos un PUT para comprobar que los datos se sobreescriben
    cy.request('PUT', `https://api.restful-api.dev/objects/${objectID}`, putData)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(putData);
    });
    cy.wait(1000);
// // Aquí hacemos un PATCH para comprobar que podemos modificar solo algunos datos, (pero en esta API actúa como un PUT)
    cy.request('PATCH', `https://api.restful-api.dev/objects/${objectID}`, patchData)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(patchData);
    cy.request(`https://api.restful-api.dev/objects/${objectID}`)
    });
// Aquí hacemos un DELETE para borrar el objeto creado
    cy.request('DELETE', `https://api.restful-api.dev/objects/${objectID}`) .then((response) => {
      expect(response.body.message).to.eq(`Object with id = ${objectID} has been deleted.`);
    })
   });
  });

//Otra forma de hacerlo es guardar el valor de la ID en una variable fuera de los tests para poder usarlas en otros tests

let id
//Declaramos la variable id vacía para luego ponerle elvalor de la ID y tener acceso en todos los tests 
    it('POST - Creation of new product', () => {
        const bodyCreate = {
            name: "Prueba",
            data: null
        };
        cy.request('POST', 'https://api.restful-api.dev/objects', bodyCreate)
        .then((response) => {

          id = response.body.id
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.include(bodyCreate);
            cy.log(response.body.createdAt);
            cy.log(response.body.id);
        })
    });

    it('PATCH - Modify value in new product', () => {
        const bodyUpdate = {
            data: {
                year: 2019,
            }
        }
        cy.request('PATCH',  `https://api.restful-api.dev/objects/${id}`, bodyUpdate)
        .then((response) => {
            const res = response.body
            expect(response.status).to.eq(200);
            expect(res).to.deep.include(bodyUpdate);
            expect(res.id).eq(id);
            expect(res.updatedAt).to.be.a('string');
        })
    })

    it('GET new product created', () => {
        const expectedBody = {
            id: id,
            name: "Prueba",
            data: {
                year: 2019,
            }
        }
        cy.request('GET', `https://api.restful-api.dev/objects/${id}`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.eq(expectedBody);
        })
    });

    it('DELETE new product created', () => {
        const expectedBody = {
            message: `Object with id = ${id} has been deleted.`
        }
        cy.request('DELETE', `https://api.restful-api.dev/objects/${id}`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.eq(expectedBody);
        })
    });



//     // He tenido que modificar los ejercicios así porque daba error haciendo solo PUT y PATCH
//     it('Create new object with POST and update it with PUT', () => {
//       const originalObject = {
//           name: "iPhone 15 Pro",
//           data: {
//           color: "Titanium",
//           capacity: "256 GB"
//           }
//       }
      
//       // 1. Crear un nuevo objeto con POST
//       cy.request('POST', 'https://api.restful-api.dev/objects', originalObject)
//       .then((postResponse) => {
//           expect(postResponse.status).to.eq(200)
//           const newId = postResponse.body.id
//           cy.log(newId)
//           // 2. Actualizar ese objeto con PUT 
//           const updatedObject = {
//           name: "iPhone 15 Ultra",
//           data: {
//               color: "Black Titanium",
//               capacity: "512 GB"
//           }
//           }
      
//           cy.request('PUT', `https://api.restful-api.dev/objects/${newId}`, updatedObject)
//           .then((putResponse) => {
//           expect(putResponse.status).to.eq(200)
//           expect(putResponse.body.name).to.eq(updatedObject.name)
//           expect(putResponse.body.data).to.deep.equal(updatedObject.data)
//           })
//       })
//       })

//       it('POST, GET, DELETE and verify object removal', () => {
//         // 1. Crear un nuevo objeto con POST
//         const newObject = {
//         name: "OnePlus 11",
//         data: {
//             color: "Black",
//             capacity: "256 GB"
//         }
//         }
    
//         cy.request('POST', 'https://api.restful-api.dev/objects', newObject)
//         .then((postResponse) => {

//         // 2. Verificar que el POST se hizo bien y que el objeto tiene un ID y createdAt
//         expect(postResponse.status).to.eq(200)
//         expect(postResponse.body).to.have.property('id')
//         expect(postResponse.body).to.have.property('createdAt')
    
//         const newId = postResponse.body.id
//         const createdAt = postResponse.body.createdAt
    
//         // Hacer log del ID y createdAt
//         cy.log('ID del producto creado:', newId)
//         cy.log('createdAt del producto creado:', createdAt)
    
//         // 3. Hacer GET del producto recién creado
//         cy.request(`https://api.restful-api.dev/objects/${newId}`)
//         .then((getResponse) => {

//         // Comprobar que la respuesta del GET contiene los mismos valores que el POST
//         expect(getResponse.status).to.eq(200)
//         expect(getResponse.body.id).to.eq(newId)
//         expect(getResponse.body.name).to.eq(newObject.name)
//         expect(getResponse.body.data.color).to.eq(newObject.data.color)
//         expect(getResponse.body.data.capacity).to.eq(newObject.data.capacity)
//         })
    
//         // 4. Hacer DELETE del producto recién creado
//         cy.request('DELETE', `https://api.restful-api.dev/objects/${newId}`)
//         .then((deleteResponse) => {
//         expect(deleteResponse.status).to.eq(200) 
    
//             // 5. Hacer GET para comprobar que el producto ya no existe
//             cy.request({
//                 method: 'GET',
//                 url: `https://api.restful-api.dev/objects/${newId}`,
//                 failOnStatusCode: false 
//             }).then((getResponseAfterDelete) => {
//                 expect(getResponseAfterDelete.status).to.eq(404)
//                 expect(getResponseAfterDelete.body.error)
//                 .to.eq(`Oject with id=${newId} was not found.`)
//             })
  
//         })
//     })
// })

})