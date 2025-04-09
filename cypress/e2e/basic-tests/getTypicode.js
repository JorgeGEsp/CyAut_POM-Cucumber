describe('Use GET method to get data from typicode', () => {

  it('first visit ang get on typicode.com', () => {
    cy.visit('https://jsonplaceholder.typicode.com/');
    cy.request({
      method:'GET',
      url: '/posts'
    })
  })

  it('GET on typicode.com with properties', () => {
    cy.api({
      method:'GET',
      url: 'https://jsonplaceholder.typicode.com/posts'
    })
  })

  it('GET on typicode.com no properties', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts'
    )
  })

  it('GET on typicode.com without add the GET string', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts')
  })

  it('GET on typicode.com and check status in response with expect', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts').then((response) => {
      expect(response.status).to.eq(200);
    })
  })

  it('GET on typicode.com and check status in response with its status', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts').its('status').should('eq', 200);
  })

  it('GET on typicode.com and check body lenght in response with its body', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts').its('body').should('have.length', 100);
  })

  it('GET on typicode.com and check lenght greater than in body response with its body', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts').its('body').should('have.length.greaterThan', 90);
  })

  it('GET on typicode.com without and check status and lenght with expect', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
    })
  })

  it('GET on typicode.com check status in response and some body properties with expect', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
      expect(response.body).to.be.a('array');
      expect(response.body).not.to.be.a('number');
    })
  })

  it('GET on typicode.com check status in response and some body properties with should', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
      expect(response.body).to.be.a('array');
      expect(response.body).not.to.be.a('number');
    })
  })


  it('GET on typicode.com check status in response and some body properties with should in posts/1', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('object');
      expect(response.body).not.to.be.a('number');
      expect(response.body).not.to.be.a('string');
    })
  })

  it('GET on typicode.com check status in response and some body properties with should in posts/1', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/').should((response) => {
      response.body.forEach((array) => {
        expect(array).to.include.all.keys(["userId", "id", "title", "body"]);
      });
    })
  })

  it('GET on typicode.com check status in response and lenght for the body', () => {
    cy.request('https://jsonplaceholder.typicode.com/comments').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(500);
      expect(response.body).to.be.a('array');
      expect(response.duration).to.be.lessThan(160);
    })
  })
  
    // Ejercicios 02-04-2025

  it('GET on typicode "/photos" check status and some body properties in response', () => {
    cy.request('https://jsonplaceholder.typicode.com/photos').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('array');
      expect(response.body).not.to.be.a('object');
      expect(response.body).to.have.length(5000);
    })
  })

  it('GET on typicode "/todos" check status some body properties in response', () => {
    cy.request('https://jsonplaceholder.typicode.com/todos').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).be.a('array');
      expect(response.body).not.to.be.a('string');
      expect(response.body).to.have.length(200);
    })
  })

  it('GET on typicode "todos/1" check status and some body properties with values in response', () => {
    cy.request('https://jsonplaceholder.typicode.com/todos/1').should((response) => {
      expect(response.status).eq(200);
      expect(response.body).be.a('object');
      expect(response.body).include.all.keys(["userId", "id", "title", "completed"]);
      expect(response.body).have.property('title', 'delectus aut autem').that.is.a('string');
      expect(response.body.title).be.a('string')
      expect(response.body.title).eq('delectus aut autem');
      expect(response.body.title).include('delectus')
      expect(response.body).have.property('completed', false);
      expect(response.body.completed).be.a('boolean');
      expect(response.body).to.deep.eq(
        {
          "userId": 1,
          "id": 1,
          "title": "delectus aut autem",
          "completed": false,
        }
      )
      expect(response.body).to.include(
        {
          "userId": 1,
          "id": 1,

        }
      )
    })
  })

  // Nuevas aserciones 

  

// Uso del find para buscar por el valor de una propiedad
  it("Checks email for id = 4 using find", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts/1/comments").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length(5);

      expect(response.body.find((alias) => alias.id === 4)).to.exist;

      // Podemos crear constantes o variables y asignarles valores para repetir menos código
      
      const idNumber = response.body.find((alias) => alias.id === 4);

      expect(idNumber).to.exist;
      expect(idNumber.email).to.be.a("string");
      expect(idNumber.email).to.eq("Lew@alysha.tv");
      expect(idNumber.email).contain("@");
      expect(idNumber.name).to.be.a("string");
      expect(idNumber.name).to.contain("alias");
      expect(idNumber.name).to.eq("alias odio sit");
      expect(idNumber.body).to.eq("non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati");
    
      const name = response.body.find((aliasName) => aliasName.name === "id labore ex et quam laborum");
      expect(name.email).be.include(".biz");
    });
  });

  it("Checks data for id = 4 using some", () => {
    cy.request( "https://jsonplaceholder.typicode.com/posts/1/comments").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length(5);
      expect(response.body.some(({ id, email, name, body }) => id === 4 && email === "Lew@alysha.tv" && name === "alias odio sit" && body === "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati")).to.be.true
    });
  });
  
  it("Check status, datatype and length of data response in /comments", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts/1/comments").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a("array");
      expect(response.body).to.have.length(5);

      response.body.forEach((comment) => {
        if (comment.id === 4) {
          expect(comment.email).to.be.a("string");
          expect(comment.email).to.be.eq("Lew@alysha.tv");
        }
      });
    });
  });

  it('get data from a typicode/post1, check its status code, type of response body and evaluates type of value', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('object');
      Object.values(response.body).forEach((value) => {
        // Comparar si los values de las key son string o un number
        expect(typeof value === 'number' || typeof value === "string").to.be.true;
        expect(typeof value != 'boolean').to.be.true;
      });
        // Se puede comprobar en la misma aserción si es un string o un number además de comprobar el valor exacto que tiene
      expect(response.body['title']).be.a('string').eq(
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
      );
      expect(response.body['userId']).be.a('number').to.eq(1);
      expect(response.body['body']).to.be.a('string').to.contain(
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      );
    });
  });

  it('get data from a typicode/post1/comments, check its status code, type of response body and assert over object with id 4', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1/comments').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('array');
      expect(response.body).to.have.length(5);
      response.body.filter((comment) => {
        comment.name === "alias odio sit" && expect(comment.email).to.eq('Lew@alysha.tv');
      });
    });
  });

  it('a 404 error is displayed when getting data from typicode/post1/comment', () => {
    cy.request({
      url: 'https://jsonplaceholder.typicode.com/posts/1/error',
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(404);
    });
  });

})