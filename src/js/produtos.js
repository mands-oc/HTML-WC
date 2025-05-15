//Criando o CRUD - CREATE / READ / UPDATE e DELETE
$(document).ready(function () {
    //READ - GET - Mostrar os elementos na tela
    $.ajax({
        url: 'http://localhost:3333/produtos', //endereço
        method: 'GET', //tipo de requisição
        dataType: 'json', //tipo de dados
        success: function (data) {
            console.log(data)
            var table = $('#cadastro tbody') //transformo o corpo da tabela em uma variável
            $.each(data, function (index, item) {
                table.append('<tr id="line">' +
                    '<td id="code">' + item.idProduto + '</td>' +
                    '<td>' + item.nomeProduto + '</td>' +
                    '<td>' + item.descricao + '</td>' +
                    '<td>' + item.valorUnit + '</td>' +
                    '<td>' + item.estoque + '</td>' +
                    '<td>' + item.imagem + '</td>' +
                    '<td>' + item.idCategoria + '</td>' +
                    '<td> <button type="button" class= "btn btn-success" data-bs-toggle= "modal" data-bs-target="#updateModal" data-id = "> ' + item.idProduto + 'id="btnEditar">Editar</button></td>' +
                    '<td> <button type="button" class= "btn btn-danger" data-bs-toggle= "modal" data-bs-target="#deleteModal" data-id = "> ' + item.idProduto + 'id="btnDelete">Excluir</button></td>'
                    + '</tr>'
                )
            })
        }
    })

    //Cadastro de produtos - POST
    $('#btnSalvar').on('click', function () { //Quando o botão salvar for clicado 
        console.log('')
        $('#form').on('click', function (event) {
            event.preventDefault();
        }); //previne o envio do formulário em branco


        // ler o conteúdo dos inputs e armazená-los em variáveis

        let idProduto = $('#m-id').val();
        let nomeProduto = $('#m-nome').val();
        let descricao = $('#m-descricao').val();
        let valor = $('#m-valor').val().replace(',', '.'); //substitui a vírgula pelo ponto para enviar para o banco de dados
        let estoque = $('#m-estoque').val();
        let imagem = $('#m-imagem').val();
        let idCategoria = $('#m-categoria').val();

        //verifica se todos os campos obrigatórios estão preenchidos
        if (idProduto != '' && nomeProduto != '' && descricao != '' && valor != '' && estoque != ''  && imagem != '' && idCategoria != '' ) {
            //envia o POST

            $.ajax({
                url: 'http://localhost:3333/produtos',
                method: 'POST',
                cache: false,
                dataType: 'json',
                data: {
                    idProduto: idProduto,
                    nomeProduto: nomeProduto,
                    descricao: descricao,
                    valorUnit: valor,
                    estoque: estoque,
                    imagem: imagem,
                    idCategoria: idCategoria
                },
                success: function () {
                    alert('Produto cadastrado com sucesso!') //emito um alerta para o usuário
                    $('#form').each(function () { //a cada envio 
                        this.reset(); //Limpa o formulário 
                        $('#addModal').modal('hide') //esconde o modal
                    })
                    location.reload(); //atualiza a página com o novo produto
                },
                error: function (err) {
                    console.log(err)
                }
            })
        } else {
            alert('Preencha corretamente os campos!');
            $('addModal').modal('hide');
        }

    })

    //Atualizando um produto - PUT
    $(document).on('click', '#btnEditar', function() {
        //recuperação do código do produto
        let line = $(this).closest('tr');
        let id = line.find('#code').text();
        console.log(id)

        //Recuperação dos dados do banco - GET

        $.ajax({
            url: 'http://localhost:3333/produtos/' + id,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#u-nome').val(data.nomeProduto);
                $('#u-descricao').val(data.descricao);
                $('#u-valor').val(data.valorUnit);
                $('#u-estoque').val(data.estoque);
                $('#u-imagem').val(data.imagem);

            },
            error: function (error) {
                console.log(error)
                console.log('Não foi possível recuperar os dados do produto.')
            }
        })

        //Alterando os dados - PUT
        $(document).on('click', 'btnAlterar', function(){
            let novoNome = $('#u-nome').val();
            let novaDesc = $('#u-descricao').val();
            let novoValor = $('#u-valor').val().replace(',' , '.');
            let novoEstoque = $('#u-descricao').val()
            let novaImagem = $('#u-imagem').val();

            //Verificar se os campos estão em branco
            if (novoNome != '' && novaDesc != '' && novoValor != '' && novaImagem != '' && novoEstoque != '') {
                //Envia a requisição
                $.ajax({
                    url: 'http://localhost:3333/produtos/' + id,
                    method: 'PUT',
                    dataType: 'json',
                    data: {
                        nomeProduto: novoNome,
                        descricao: novaDesc,
                        valorUnit: novoValor,
                        estoque: novoEstoque,
                        imagem: novaImagem

                    },
                    success: function() {
                        alert('Produto atualizado com sucesso!');
                        $('#updateModal').modal('hide');
                        location.reload();
                    },
                    error: function (error) {
                        alert('Não foi possível atualizar o produto.');
                        $('#updateModal').modal('hide');
                        console.log(error);
                        location.reload();
                    }
                })
            } else{
                alert('Falha ao atualizar o produto.')
            }
        })

    })

//Excluindo um produto - DELETE
$(document).on('click', '#btnDelete', function(){
    //Verificando o id do produto
    let line = $(this).closest('tr');
    let id = line.find('#code').text();

    $(document).on('click', 'btnSim', function(){
        $.ajax({
            url: 'http://localhost:3333/produtos/' + id,
            method: 'DELETE',
            success: function(){
                line.remove(); //Remover a linha do produto
                alert('Produto excluído com sucesso!')
                location.reload();
            },
            error: function(error){
                console.log('Não foi possível excluir o produto.')
                console.log(error);
                $('updateModal').modal('hide')
            }
        })
    })
})
});