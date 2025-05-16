//Criando o CRUD - CREATE / READ / UPDATE e DELETE
$(document).ready(function () {
    //READ - GET - Mostrar os elementos na tela
    $.ajax({
        url: 'http://localhost:3333/entregadores', //endereço
        method: 'GET', //tipo de requisição
        dataType: 'json', //tipo de dados
        success: function (data) {
            console.log(data)
            var table = $('#cadastro tbody') //transforma o corpo da tabela em uma variável
            $.each(data, function (index, item) {
                table.append('<tr id="line">' +
                    '<td id="code">' + item.idEntregador + '</td>' +
                    '<td>' + item.nomeEntregador + '</td>' +
                    '<td>' + item.cnh + '</td>' +
                    '<td>' + item.telefoneEntregador + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.idEntregador + '" id="btnEditar">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + item.idEntregador + '" id="btnDelete">Excluir</button></td>' +
                    '</tr>'
                );
            });
        }
    })


    //Cadastro de entregadores - POST
    $('#btnSalvar').on('click', function () { //Quando o botão salvar for clicado 
        console.log('oi')
        $('#form').on('submit', function (event) {
            event.preventDefault();
        }); //previne o envio do formulário em branco


        // ler o conteúdo dos inputs e armazená-los em variáveis

        let nomeEntregador = $('#m-nome').val();
        let cnh = $('#m-cnh').val();
        let telefone = $('#m-telefone').val();

        //verifica se todos os campos obrigatórios estão preenchidos
        if (nomeEntregador != '' && cnh != '' && telefone != '') {
            //envia o POST

            $.ajax({
                url: 'http://localhost:3333/entregadores',
                method: 'POST',
                cache: false,
                dataType: 'json',
                data: {
                    nomeEntregador: nomeEntregador,
                    cnh: cnh,
                    telefoneEntregador: contato
                },
                success: function () {
                    alert('Entregador cadastrado com sucesso!') //emito um alerta para o usuário
                    $('#form').each(function () { //a cada envio 
                        this.reset(); //Limpa o formulário 
                        $('#addModal').modal('hide') //esconde o modal
                    })
                    location.reload(); //atualiza a página com o novo entregador
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

    //Atualizando um entregador - PUT
    $(document).on('click', '#btnEditar', function () {
        //recuperação do código do entregador
        let line = $(this).closest('tr');
        let id = line.find('#code').text();
        console.log(id)

        //Recuperação dos dados do banco - GET

        $.ajax({
            url: 'http://localhost:3333/entregadores/' + id,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // console.log(data)
                $('#u-nome').val(data.nomeEntregador);
                $('#u-cnh').val(data.cnh);
                $('#u-contato').val(data.telefoneEntregador);
            },
            error: function (error) {
                console.log(error)
                console.log('Não foi possível recuperar os dados do entregador.')
            }
        })

        //Alterando os dados - PUT
        $(document).on('click', '#btnAlterar', function () {
            let novoNome = $('#u-nome').val();
            let novoTel = $('#u-contato').val();

            //Verificar se os campos estão em branco
            if (novoNome != '' && novoTel != '' ) {
                //Envia a requisição
                $.ajax({
                    url: 'http://localhost:3333/entregadores/' + id,
                    method: 'PUT',
                    dataType: 'json',
                    data: {
                        nomeEntregador: novoNome,
                        telefoneEntregador: novoTel,
                      
                    },
                    success: function () {
                        alert('Entregador atualizado com sucesso!');
                        $('#updateModal').modal('hide');
                        location.reload();
                    },
                    error: function (error) {
                        alert('Não foi possível atualizar o entregador.');
                        $('#updateModal').modal('hide');
                        console.log(error);
                        location.reload();
                    }
                })
            } else {
                alert('Falha ao atualizar o entregador.')
            }
        })

    })

    //Excluindo um entregador - DELETE
    $(document).on('click', '#btnDelete', function () {
        //Verificando o id do entregador
        let line = $(this).closest('tr');
        let id = line.find('#code').text();

        $(document).on('click', '#btnSim', function () {
            $.ajax({
                url: 'http://localhost:3333/entregadores/' + id,
                method: 'DELETE',
                success: function () {
                    line.remove(); //Remover a linha do entregador
                    alert('Entregador excluído com sucesso!')
                    location.reload();
                },
                error: function (error) {
                    console.log('Não foi possível excluir o entregador.')
                    console.log(error);
                    $('updateModal').modal('hide')
                }
            })
        })
    })
});