<?php
defined('BASEPATH') or exit('No direct script access allowed');

require_once(APPPATH . "controllers/Issue.php");

class BOD extends Issue
{

      private $fields = [
            'customfield_10030',    // MEMBER NAME
            'customfield_10029',    // LOAN TYPE
            'customfield_10064',    // LOAN AMOUNT
            'customfield_10060',    // BOD APPROVED 
            'customfield_10065',    // OUTSTANDING BALANCE
            'customfield_10066',    // LENGTH OF SERVCE
            'customfield_10070',    // AVERAGE COLLECTION
            'customfield_10067',    // SEMI MONTHLY AMORT
            'customfield_10068',    // DEFFERED
            'customfield_10069',    // SOA
            'customfield_10054',    // BOD ASSIGNED
            'Status', 
            'attachment'
      ];

      public function getDeniedList($BoDID)
      {

            $data = array(
                  //DEFINE THE JQL TO GET THE BOD LIST
                  'jql' => 'project = PO AND "PO Approval Status[Dropdown]" = Disapproved  AND "BOD-ASSIGNED[Checkboxes]" in (' . $BoDID . ')',

                  //DEFINE THE FIELDS TO BE RETURNED
                  'fields' => $this->fields
            );

            $val = json_encode($this->get_from("search?&expand=names", $data));
            echo $val;
      }

      public function getBODList($BoDID)
      {

            $data = array(
                  //DEFINE THE JQL TO GET THE BOD LIST
                  'jql' => 'project = PO AND status = "BOD Approval" AND "PO Approval Status[Dropdown]" = Pending  AND "BOD-ASSIGNED[Checkboxes]" in (' . $BoDID . ')',

                  //DEFINE THE FIELDS TO BE RETURNED
                  'fields' => $this->fields
            );

            $val = json_encode($this->get_from("search?&expand=names", $data));
            echo $val;
      }   

      
    //bod
    public function updateBOD($action){
      $key = $this->input->post("poNum");
      //$datahere = array($this->input->post("dataArray"))[0];

      foreach($key as $id){
          if($action == "approve"){
              $result = $this->put_to('issue/'.$id, $this->approveData());
          }
          else if($action == "disapprove"){
              $result = $this->put_to('issue/'.$id, $this->disapproveData());
          }
          else if($action == "pending"){
              $result = $this->put_to('issue/'.$id, $this->pendingData());
          }
      }
      $this->json_response($result);
  }

}
