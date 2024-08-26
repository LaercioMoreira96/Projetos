const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');

const app = express();
const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hotdog_da_re',
    password: 'admin',  
    port: 5432,
});

app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/api/produtos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Produtos');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/api/vendas', async (req, res) => {
    const { NomeCliente, ProdutoID, Quantidade } = req.body;

    try {
        
        const produtoResult = await pool.query('SELECT * FROM Produtos WHERE ProdutoID = $1', [ProdutoID]);
        const produto = produtoResult.rows[0];

        if (!produto) {
            return res.status(400).json({ error: 'Produto não encontrado' });
        }

        
        const precoTotal = produto.preco * Quantidade;

        
        const result = await pool.query(
            'INSERT INTO Vendas (NomeCliente, ProdutoID, Quantidade, PrecoTotal) VALUES ($1, $2, $3, $4) RETURNING *',
            [NomeCliente, ProdutoID, Quantidade, precoTotal]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api/export', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Vendas');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Vendas');

        
        worksheet.columns = [
            { header: 'VendaID', key: 'vendaid', width: 10 },
            { header: 'NomeCliente', key: 'nomecliente', width: 30 },
            { header: 'ProdutoID', key: 'produtoid', width: 15 },
            { header: 'Quantidade', key: 'quantidade', width: 15 },
            { header: 'PrecoTotal', key: 'precototal', width: 20 },
            { header: 'DataVenda', key: 'datavenda', width: 20 },
        ];

        
        result.rows.forEach(row => {
            worksheet.addRow({
                vendaid: row.vendaid,
                nomecliente: row.nomecliente,
                produtoid: row.produtoid,
                quantidade: row.quantidade,
                precototal: row.precototal,
                datavenda: row.datavenda,
            });
        });

        
        res.setHeader('Content-Disposition', 'attachment; filename=vendas.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
