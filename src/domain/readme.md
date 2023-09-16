# Domínio
Abrange as entidades e os services, as partes mais puras da nossa aplicação.

Nós descobrimos nossos services (use cases) e entidades através de conversas com os experts de domínio.

# Entidades
É tudo que se pode entender como algo a ser mantido pela aplicação. Elas traduzem as partes das aplicações em código.

## Value objects
- São propriedades das entidades que possuem regras de negócio e, portanto, são quase tão complexas quanto entidades.
- Exemplo: validação ou transformação de um título para um slug, que não pode ter acentos, espaços, máximo de tamanho, etc...
- Ficam dentro de um diretório value-objects que fica dentro do diretório de entidades
- Nem tudo pode ser um value-object. Apenas viram value-objects propriedades que são muito complexas e contam com muito código para funcionarem. Que são muito importantes e deviam ser reaproveitáveis.

# Services (use cases)
São pedaços de código que realizam ações independente de qualquer dependência e desconectada do alheio à aplicação.

---

# Subdomínios
São as repartições/setores do problema; aplicação num contexto geral.

- application -> partes relacionadas ao código, à aplicação
- enterprise -> regras de negócio, a camada dos experts de domínios