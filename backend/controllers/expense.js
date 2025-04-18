const ExpenseSchema = require ('../models/ExpenseModel')

exports.addExpense = async (req, res) => {
    const {title, amount, description, category, date} = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date ){
           return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <=0  || !amount === 'number'  ){
           return res.status(400).json({message: 'Input a valid amount'})
        }
        await expense.save()
        res.status(200).json({message: 'expense added'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
    console.log (expense)
}

exports.getExpense = async (req, res) => {
     try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
     } catch (error) {
        res.status(500).json({message: 'server error'})
     }
}
exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
      .then((expense) => {
        res.status(200).json({message: 'expense deleted'})
      })
      .catch((err) => {
        res.status(500).json({message: 'server error'})
      })
}