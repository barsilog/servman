<?php
defined('BASEPATH') OR exit('No direct script access allowed');
define('JIRA_URL', 'https://southpacificgroup.atlassian.net/');

class Issue extends CI_Controller {

    public function index()
    {
        $this->load->view("itsm/main");
    }

    public function getIssues(){

        $data = array(
            //DEFINE THE JQL TO GET THE BOD LIST
            'jql' => 'project = SMS',

            //DEFINE THE FIELDS TO BE RETURNED
            'fields' => $this->fields
        );

        $val = json_encode($this->get_from("search?&expand=names", $data));
        echo $val;
        
    }

    //sample data
    public function getData(){
        return array(
            'fields' => array(//fields, add here
                'project' => array('id' => '10000'),
                'summary' => 'Issue from REST API',
                'customfield_10029' => array('id' => '10020'),
                'resolution' => array('id' => '10003'),
                'issuetype' => array('id' => '10003')
            )
        );
    } 
    public function editData(){
        return array (
            'fields' => array(
                'summary' => "Issue BoD(Approved) via REST API",
                'customfield_10061' => array('id' => '10061')
            )
        );
    }
   
    //addIssueData
    public function addIssue($dataArray){
        return array(
            'fields' => $dataArray
        );
    } 


    //methods
    public function create($data) {        
        $data['issue'] = $this->post_to('issue', (($data) ? $this->getData(): $data)  );
    }

    public function update($key,$action) {
        if($action == "approve"){
            return $this->put_to('issue/'.$key, $this->approveData());
        }
        else if($action == "disapprove"){
            return $this->put_to('issue/'.$key, $this->disapproveData());
        }
    }

    public function search($idSend,$uri='search'){
        return $this->get_from($uri, $idSend);
    }

    //update action data
    public function approveData()
    {
            return array(
                'fields' => array(
                        'summary' => "Issue BoD(Approved) via REST API",
                        'customfield_10061' => array('id' => '10061')
                )
            );
    }
    public function disapproveData()
    {
            return array(
                'fields' => array(
                        'summary' => "Issue BoD(Dispproved) via REST API",
                        'customfield_10061' => array('id' => '10062')
                )
            );
    }
    public function pendingData()
    {
            return array(
                'fields' => array(
                        'summary' => "Issue BoD(Pending) via REST API",
                        'customfield_10061' => array('id' => '10063')
                )
            );
    }
    
    //newIssue
    public function newIssue() {   
        $dataArray = $this->input->post("dataArray");
        $result = $this->post_to('issue', $this->addIssue($dataArray));

        // echo('Create Issue with '.$result->key);
        $this->json_response(json_encode($result));  
    }
    
    //-------------

    public function getValue($field, $isSelectList=false){

        if($isSelectList && $field){
            return ($field->value) ? $field->value : "-" ;
        }
        else{
            return ($field) ? $field : "-" ;
        }
    }
    
    protected function post_to($resource, $data) {
            
        // $postData = $this->input->post();

	    //convert data array to JSON string
	    $jdata = json_encode($data);
	    $ch = curl_init();
        //configure CURL

        $headers = array(//authorization, headers
		    "Content-Type: application/json",
            // "Authorization: Basic YmFyeS5yZXllc0B5YWhvby5jb206VVAzdmVBTGlVUzdkSDQwSzVBTUQzODc1",
            "X-Atlassian-Token: UP3veALiUS7dH40K5AMD3875",
            "Access-Control-Allow-Origin: *"
	    );

	    curl_setopt_array($ch, array(
            CURLOPT_POST => 1,
		    CURLOPT_URL => JIRA_URL . '/rest/api/2/' . $resource,
		    CURLOPT_POSTFIELDS => $jdata,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers
	    ));

	    $result = curl_exec($ch);
	    curl_close($ch);
        //convert JSON data back to PHP array
        
        return json_decode($result);
    }

    public function json_response($data=null, $httpStatus=200){
        header_remove();
        header("Content-Type: application/json");
        http_response_code($httpStatus);
        echo $data;
        exit();
    }

    protected function put_to($resource, $data) {
        $jdata = json_encode($data);
        $ch = curl_init();

        $headers = array(//authorization, headers
		    "Content-Type: application/json",
            "Authorization: Basic YmFyeS5yZXllc0B5YWhvby5jb206VVAzdmVBTGlVUzdkSDQwSzVBTUQzODc1",
            "X-Atlassian-Token: UP3veALiUS7dH40K5AMD3875",
            "Access-Control-Allow-Origin: *"
	    );

        curl_setopt_array($ch, array(
            CURLOPT_CUSTOMREQUEST => "PUT",
            CURLOPT_URL => JIRA_URL . '/rest/api/2/' . $resource,
		    CURLOPT_POSTFIELDS => $jdata,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers
        ));

        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public function get_from($resource, $data) {
        //convert array to JSON string
        $jdata = json_encode($data);
        $ch = curl_init();

        $headers = array(//authorization, headers
		    "Content-Type: application/json",
            "Authorization: Basic YmFyeS5yZXllc0B5YWhvby5jb206VVAzdmVBTGlVUzdkSDQwSzVBTUQzODc1",
            "X-Atlassian-Token: UP3veALiUS7dH40K5AMD3875",
            "Access-Control-Allow-Origin: *"
        );
        
        //configure CURL
        curl_setopt_array($ch, array(
            CURLOPT_URL => JIRA_URL . '/rest/api/2/' . $resource,
		    CURLOPT_POSTFIELDS => $jdata,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers
        ));

        $result = curl_exec($ch);
        curl_close($ch);
        //convert JSON data back to PHP array
        return json_decode($result);
    }

}
?>