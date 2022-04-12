import * as React from 'react';
import styles from './ManageSchedules.module.scss';
import { IManageSchedulesProps } from './IManageSchedulesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp, { Item, Items, sp } from 'sp-pnp-js';
import  SearchComponent from './SearchComponent';

export default class ManageSchedules extends React.Component<IManageSchedulesProps,{}> {
  public constructor(props:IManageSchedulesProps) {
  super(props);
  
  pnp.setup({
    spfxContext: this.props.spcontext
  });  
  }  
  
  public render(): React.ReactElement<IManageSchedulesProps>{
    return (
      <div>   
        {/* DashboardGridView page */}
        <SearchComponent description={this.props.description} spcontext={this.props.spcontext} SiteUrl={this.props.SiteUrl} PageName={"DashboardGridView"} GridViewPageName={"DashboardGridView"} ManageSchedulesPageName={"DashboardGridView"} LandingScreenPageName={"DashboardGridView"}/>
        {/* DashboardHome page */}   
        <SearchComponent description={this.props.description} spcontext={this.props.spcontext} SiteUrl={this.props.SiteUrl} PageName={"DashboardHome"} GridViewPageName={"DashboardHome"} ManageSchedulesPageName={"DashboardHome"} LandingScreenPageName={"DashboardHome"}/>
        {/* ManageSchedule page */}    
        <SearchComponent description={this.props.description} spcontext={this.props.spcontext} SiteUrl={this.props.SiteUrl} PageName={"ManageSchedules"} GridViewPageName={"ManageSchedules"} ManageSchedulesPageName={"ManageSchedules"} LandingScreenPageName={"ManageSchedules"}/>  
        {/* Landing page */}    
        <SearchComponent description={this.props.description} spcontext={this.props.spcontext} SiteUrl={this.props.SiteUrl} PageName={"LandingScreen"} GridViewPageName={"LandingScreen"} ManageSchedulesPageName={"LandingScreen"} LandingScreenPageName={"LandingScreen"}/>
      </div>      
    );       
  }       
  
    
}
