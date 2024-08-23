const { mongoose } = require('mongoose')

const kycSchema = new mongoose.Schema(
  {
    account_no:{
      type: String,
      required: true,
    },
    photograph_check: {
      type: Boolean,
      required: false,
    },
    signiture_card_check: {
      type: Boolean,
      required: false,
    },
    aml_check: {
     type: Boolean,
     required: false,
    },
    nid_check: {
      type: Boolean,
      default: false,
    },
    nid_verify_upload: {
      type: String,
      required: false,
    },
    nominee_check: {
      type: Boolean,
      default: false,
    },
    check_status:{
      type: String,
    },
    remark:{
      type: String
    }
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Kyc', kycSchema)
