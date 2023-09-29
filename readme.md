# Ignite Forum

## Conversa fictícia com um expert de domínio
- "Eu (*eu = uma entidade*) tenho muita dificuldade em saber as dúvidas dos alunos (*outra entidade*)"
- "**Eu** tenho que responder os alunos e às vezes me perco em quais dúvidas já foram respondidas"

---

A partir dessas conversas, traduzimos as necessidades em códigos **DE FORMA PURA**, isto é, pensando no código sem pensar em frameworks.

---

# Outros conceitos

- Aggregate
    - 2 ou mais entidades que são trabalhadas juntas (em qualquer processo de um CRUD) **AO MESMO TEMPO**
    - São como relacionamenos que são sempre trabalhadas juntas
        - Question -- Attachment[]
        - sempre que posso criar ou editar ou apagar uma question, posso tbm criar, editar ou apagar seus anexos
    - Os agregados podem fazer coisas que entidades mais simples não teriam o direito de fazer
    - Root é a entidade principal dentro de um agregado de entidades

- Watched lists
    - uma patter; classe que permite que nós tenhamos mais informações sobre itens contidos numa lista
    - é um array, mas cada item dentro do array tem informações do próprio item e informações como se é um item deletado, editado, adicionado
    - facilita sabermos que operações fazer para cada item

## Exemplo
**CRIAÇÃO**
- título
- conteúdo
- anexos (3)

**EDIÇÃO**
- conteúdo
- adicionar um novo anexo (create)
- remover o segundo anexo que tinha sido criado antes (delete)
- editar um anexo existente (update)

---

[Domínios e subdomínios](src\domain\)