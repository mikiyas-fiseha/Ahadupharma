const mongoose = require("mongoose"); // Erase if already required

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
})

module.exports = mongoose.model('SubCategory', subCategorySchema);