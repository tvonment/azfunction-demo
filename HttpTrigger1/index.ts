import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from "@azure/identity";
import axios, { AxiosRequestConfig } from "axios";

const MS_GRAPH_QUERY = "https://graph.microsoft.com/v1.0/users/admin@CRM132634.OnMicrosoft.com";
const MS_GRAPH_SCOPE = "https://graph.microsoft.com/.default";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const credential = new DefaultAzureCredential();
    let token = await credential.getToken(MS_GRAPH_SCOPE);
    let data = await sendGraphGetQuery(token.token);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };

};

async function sendGraphGetQuery(token: string) {
    let config: AxiosRequestConfig = {
      method: 'get',
      url: MS_GRAPH_QUERY,
      headers: {
        'Authorization': 'Bearer ' + token //the token is a variable which holds the token
      }
    }
  
    return await axios(config)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

export default httpTrigger;