export default () => ({
  port: parseInt(process.env.PORT),
  database: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    schema: process.env.MYSQL_DATABASE,
  },
  credentials:{
    apikey: process.env.APIKEY,
    iam_apikey_description: process.env.IAM_APIKEY_DESCRIPTION,
    iam_apikey_name: process.env.IAM_APIKEY_NAME,
    iam_role_crn: process.env.IAM_ROLE_CRN,
    iam_serviceid_crn: process.env.IAM_SERVICEID_CRN,
    url: process.env.URL
  }
});

