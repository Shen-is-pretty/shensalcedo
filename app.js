const express = require('express');
const bodyParser = require('body-parser');

//Routes Here
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoute');
const deptRoutes = require('./routes/deptRoutes');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.send("Shen Salcedo ");
});

//Endpoint Here
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dept', deptRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});