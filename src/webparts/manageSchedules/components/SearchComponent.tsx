import * as React from 'react';
import pnp from 'sp-pnp-js';
import styles from './ManageSchedules.module.scss';
//import {Dropdown, IDropdownStyles, IDropdownOption} from '@fluentui/react';
import { IManageSchedulesProps } from './IManageSchedulesProps';
import {PrimaryButton,Dropdown, IDropdownStyles, IDropdownOption, MessageBar, MessageBarType, Stylesheet, DefaultButton,} from 'office-ui-fabric-react';
import ManageSchedules from './ManageSchedules';
import { size } from 'lodash';

export interface SearchComponentState{

    OperatingGroupTitle:any;
    BusinessTitle:any;
    RegionsTitle:any;
    FacilitiesTitle:any;
    GPYear:any;
    DashboardGridView:any;
    DasboardHome:any;
    ManageSchedules:any;
    LandingScreen:any;
 }
  
  export default class SearchComponent extends React.Component<IManageSchedulesProps,SearchComponentState>{

    private GpOperatingGroupOptions: { key: number, text: string }[] = [];
    private GpBusinessOptions: { key: number, text: string }[] = [];
    private GpRegionsOptions: { key: number, text: string }[] = [];
    private GpFacilitiesOptions: { key: number, text: string }[] = [];
    private GPYearOption: { key: any, text: any }[] = [];
   
    private years:any = [];
    private Status: IDropdownOption[] = [
      { key: 'Overdue', text: 'Overdue' },
      { key: 'partial', text: 'partial' },
    ];

     private Months: IDropdownOption[] = [
      { key: 'January', text: 'January' },
      { key: 'February', text: 'February' },
      { key: 'March', text: 'March' },
      { key: 'April', text: 'April' },
      { key: 'May', text: 'May' },
      { key: 'June', text: 'June' },
      { key: 'July', text: 'July' },
      { key: 'August', text: 'August' },
      { key: 'September', text: 'September' },
      { key: 'October', text: 'October' },
      { key: 'November', text: 'November' },
      { key: 'December', text: 'December' },
    ];
    
    constructor(props:IManageSchedulesProps, state:SearchComponentState)
    {
    super(props);
    pnp.setup({
        spfxContext: this.props.spcontext
      });
  
      //let ShowHideComp1=this.props.PageName;
     
    //states
    this.state={
        OperatingGroupTitle:"",
        BusinessTitle:"",
        RegionsTitle:"",
        FacilitiesTitle:"",
        GPYear:"",
        DashboardGridView:this.props.PageName,
        DasboardHome:this.props.GridViewPageName,
        ManageSchedules:this.props.ManageSchedulesPageName,
        LandingScreen:this.props.LandingScreenPageName
    };
    

    //call method to get list items
    this._getvalues();
    this.onSelectYear();
    }

    //Method to get all items from lists
    private async _getvalues()
    {
    try{
    this.GpOperatingGroupOptions =[];
    this.GpBusinessOptions =[];
    this.GpRegionsOptions =[];
    this.GpFacilitiesOptions =[];


    //GPOperatingGroups list items
    let listOpeartingGrp = await pnp.sp.web.lists.getByTitle("GPOperatingGroups").items.orderBy("Title").get();

    //GPBusiness list items
    let listBusinessGrp = await pnp.sp.web.lists.getByTitle("GPBusiness").items.select("Title","OperatingGroup/Title, OperatingGroup/ID").expand("OperatingGroup").get();

    //GPRegions list items
    const listRegionsGrp = await pnp.sp.web.lists.getByTitle("GPRegions").items.orderBy("Title").get();
    
    //GPOperatingGroups items
    if (listOpeartingGrp.length > 0) {
        listOpeartingGrp.map((item, index) => {
          this.GpOperatingGroupOptions.push({ key: item.ID, text: item.Title });
        });
        console.log(this.GpOperatingGroupOptions);
      console.log(listOpeartingGrp);
      }

    //GPRegions items
    if (listRegionsGrp.length > 0) {
        listRegionsGrp.map((item, index) => {
          this.GpRegionsOptions.push({ key: item.ID, text: item.Title });
        });
        console.log(this.GpRegionsOptions);
      console.log(listRegionsGrp);
      }

    }
    catch (e) {
        console.error(e);
      }

 }

 //GPBusiness items
 private onSelectOpGroup = async (ID) => {
  this.GpBusinessOptions = [];
  var GPBusinessItems: any = [];
    if (ID == "") {
      GPBusinessItems = await pnp.sp.web.lists.getByTitle("GPBusiness").items.orderBy("Title").get();
    }
    else {
      GPBusinessItems = await pnp.sp.web.lists.getByTitle("GPBusiness").items.filter("OperatingGroupId eq " + ID).orderBy("Title").get();
    }
    console.log(GPBusinessItems);
    if (GPBusinessItems.length > 0) {
      GPBusinessItems.map((item, index) => {
        this.GpBusinessOptions.push({ key: item.ID, text: item.Title });
      });
    }
}


//GPFacilities items
private onSelectRegion= async (ID) => {
  this.GpFacilitiesOptions = [];
  var GPFacilitiesItems: any = [];
    if (ID == "") {
      GPFacilitiesItems = await pnp.sp.web.lists.getByTitle("GPFacilities").items.orderBy("Title").get();
    }
    else {
      GPFacilitiesItems = await pnp.sp.web.lists.getByTitle("GPFacilities").items.filter("RegionId eq " + ID).orderBy("Title").get();
    }
    console.log(GPFacilitiesItems);
    if (GPFacilitiesItems.length > 0) {
      GPFacilitiesItems.map((item, index) => {
        this.GpFacilitiesOptions.push({ key: item.ID, text: item.Title });
      });
    }
}

private onSelectYear= async () => { 
//this.years = function(startYear){
   
  var startYear:any = startYear || 2021;
  var currentYear = new Date().getFullYear();
  //var currentYears = currentYear++;
  for(var i=startYear;i<=currentYear;i++){
  this.years.push(i);

  } 
  console.log(this.years);
  if (this.years.length > 0) {
    this.years.map((item, index) => {
      this.GPYearOption.push({key:item,text:item});
    });
  console.log(this.GPYearOption);
  }

}

  public render():React.ReactElement<SearchComponentState>{
        return(
            <div className={styles.manageSchedules}>
            
            <form>
            <div className={styles.container}>
            {(this.state.DashboardGridView == "DashboardGridView" || this.state.ManageSchedules === "ManageSchedules") &&
            <div>
            <h1 className={styles.heading}>Stack Testing</h1>
            <div className={styles.SPbutton}>
            <PrimaryButton text="Stack Test" className={styles.Sbtn}/>
            <DefaultButton text="Performance Evaluation" className={styles.Pbtn}/>
            </div>
            </div>
            }
      
            <div>
            <table className={styles.Gptable}>
            <tr >
            {(this.state.DashboardGridView == "DashboardGridView" || this.state.DasboardHome == "DashboardHome" || this.state.ManageSchedules === "ManageSchedules" || this.state.LandingScreen=="LandingScreen")  &&
            <td className={styles.Gptd}>
            <Dropdown className={styles.dropdown}
                placeholder="Select Operating group"
                label="Operating Group"
                selectedKey={this.state.OperatingGroupTitle}
                onChange={(event, value, index) => { this.setState({ OperatingGroupTitle: value.key }); this.onSelectOpGroup(value.key);}}
                options={this.GpOperatingGroupOptions}
               />
            </td>
            }
            {(this.state.DashboardGridView == "DashboardGridView" || this.state.DasboardHome == "DashboardHome" || this.state.ManageSchedules === "ManageSchedules" || this.state.LandingScreen=="LandingScreen") &&
            <td className={styles.Gptd}>
            <Dropdown className={styles.dropdown}
                placeholder="Select Business"
                label="GP Business"
                selectedKey={this.state.BusinessTitle}
                onChange={(event, value, index) => { this.setState({BusinessTitle:value.key}); }}
                options={this.GpBusinessOptions}
             />
             </td>
            }
            { (this.state.DashboardGridView == "DashboardGridView"  || this.state.DasboardHome == "DashboardHome" || this.state.ManageSchedules === "ManageSchedules" || this.state.LandingScreen=="LandingScreen") &&
            <td className={styles.Gptd}>
             <Dropdown className={styles.dropdown}
                placeholder="Select Regions"
                label="GP Regions"
                selectedKey={this.state.RegionsTitle}
                onChange={(event, value, index) => { this.setState({ RegionsTitle: value.key }); this.onSelectRegion(value.key);}}
                options={this.GpRegionsOptions}
              />
              </td>
             }
             {(this.state.DashboardGridView == "DashboardGridView" || this.state.DasboardHome == "DashboardHome" || this.state.ManageSchedules === "ManageSchedules" || this.state.LandingScreen=="LandingScreen") &&
              <td className={styles.Gptd}>
               <Dropdown className={styles.dropdown}
                placeholder="Select Facilities"
                label="GP Facilities"
                selectedKey={this.state.FacilitiesTitle}
                onChange={(event, value, index) => { this.setState({ FacilitiesTitle: value.key }); }}
                options={this.GpFacilitiesOptions}
              />
              </td>
              }
              {(this.state.DashboardGridView == "DashboardGridView" || this.state.LandingScreen=="LandingScreen") &&
              <td className={styles.Gptd}>
               <Dropdown className={styles.dropdown}
                placeholder="Select Status"
                label="Status"
                // selectedKey={this.state.FacilitiesTitle}
                // onChange={(event, value, index) => { this.setState({ FacilitiesTitle: value.key }); }}
                options={this.Status}
              />
              </td>
              }
              {(this.state.DashboardGridView == "DashboardGridView" || this.state.DasboardHome == "DashboardHome" || this.state.LandingScreen=="LandingScreen") &&
              <td className={styles.Gptd}>
               <Dropdown className={styles.dropdown}
                placeholder="Select Year"
                label="Year"
                options={this.GPYearOption}
              />
              </td>
              }
              {(this.state.DashboardGridView == "DashboardGridView" || this.state.DasboardHome == "DashboardHome" || this.state.LandingScreen=="LandingScreen") &&
              <td className={styles.Gptd}>
               <Dropdown className={styles.dropdown}
                placeholder="Select Month"
                label="Month"
                options={this.Months}
              />
              </td>
              }
              {(this.state.DashboardGridView == "DashboardGridView" || this.state.DasboardHome == "DashboardHome" || this.state.ManageSchedules === "ManageSchedules" || this.state.LandingScreen=="LandingScreen")  &&
              <td className={styles.Gpbutton}> 
              <PrimaryButton text="Go"/>
              </td>
               }
              </tr>  
              </table>
              </div>
              </div>  
            </form>  
        </div>
        );

       
        
    }
   
}


