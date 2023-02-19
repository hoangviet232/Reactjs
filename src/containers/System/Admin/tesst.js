// import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import {connect} from 'react-redux';
// import './TableManageUser.scss';
// import * as actions from "../../../store/actions"
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import './ManageDoctor.scss';
// import 'react-markdown-editor-lite/lib/index.css';
// import Select from 'react-select';
// import {CRUD_ACTIONS,LANGUAGES} from '../../../utils';
// import { getDetailInforDoctor,saveBulkScheduleDoctor } from '../../../services/userService';

// const mdParser = new MarkdownIt(/* Markdown-it options */);

// class ManageDoctor extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             contentMarkdown:'',
//             contentHTML: '',
//             selectedOption:'',
//             description: '',
//             selectedDoctor:{},
//             listDoctors : [],
//             hasOldData: false,

//             listPrice:[],
//             listPayment:[],
//             listProvince:[],
//             selectedPrice:'',
//             selectedPayment:'',
//             selectProvince:'',
//             nameClinic:'',
//             addressClinic:'',
//             note:''
//         }
//     }
//     componentDidMount(){
//         this.props.fetchAllDoctors();
//         this.props.getAllRequiredDoctorInfor();
//     }
//     buildDataInputSelect = (inputData,type) => {
//         let result = [];
//         let {language}=this.props;
//         if(inputData && inputData.length > 0){
//             inputData.map((item,index) => {
//             let object = {};
//             let labelVi = type === 'USER' ? `${item.lastName} ${item.firstName}`: item.valueVi;
//             let labelEn = type === 'USER' ? `${item.firstName} ${item.lastName}`: item.valueEn;
//             object.label = language === LANGUAGES.VI ?  labelVi:labelEn;
//             object.value = item.id;
//             result.push(object);
//         })
//         }
        
//         return result;
//     }

//     componentDidUpdate(prevProps,prevState,snapshot) {
//         if (prevProps.allDoctors !== this.props.allDoctors){
//             let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS')
//             this.setState({
//                 listDoctors: dataSelect
//             })
//         }
//         if (prevProps.language !== this.props.language){
//             let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
//             this.setState({
//                 listDoctors: dataSelect
//             })
//         }
//        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
//         let {resPayment,resPrice,resProvince} = this.props.allRequiredDoctorInfor;

//         let dataSelectPrice = this.buildDataInputSelect(resPrice);
//         let dataSelectPayment = this.buildDataInputSelect(resPayment);
//         let dataSelectProvince = this.buildDataInputSelect(resProvince);

        
//         this.setState({
//             listPrice:dataSelectPrice,
//             listPayment: dataSelectPayment,
//             listProvince: dataSelectProvince,
//         })
//        }
//     }
//     handleEditorChange = ({ html, text }) => {
//         this.setState({
//             contentMarkdown:text,
//             contentHTML: html,
//         })
   
//     }
//     handleSaveContentMarkdown = () =>{
//     let {hasOldData} = this.state;
//     this.props.saveDetailDoctor({
//         contentHTML: this.state.contentHTML,
//         contentMarkdown: this.state.contentMarkdown,
//         description:this.state.description,
//         doctorId:this.state.selectedOption.value,
//         action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
//     })
//     }
    
//     handleChangeSelect = async(selectedOption) => {
//     this.setState({ selectedOption });
//     let res = await getDetailInforDoctor(selectedOption.value);
//     if (res && res.errCode === 0 && res.data.Markdown){
//         let markdown = res.data.Markdown;
//         this.setState ({
//             contentHTML:markdown.contentHTML,
//             contentMarkdown : markdown.contentMarkdown,
//             description : markdown.description,
//             hasOldData : true
//         })
//     }    else {
//         this.setState ({
//             contentHTML:'',
//             contentMarkdown:'',
//             description: '',
//             hasOldData: false
//         })
//     }
//   };

//   handleOnChangeDesc = (event)=>{
//     this.setState ({
//         description:event.target.value
//     })
//   }
//     render() {
//         let  {hasOldData} = this.state;
//         return (
//             <div className="manage-doctor-container">
//             <div className="manage-doctor-title">
//                 <FormattedMessage id="admin.manage-doctor.title"/>
//                  </div>
//             <div className="more-infor">
//                 <div className="content-left form-group">        
//                <label> <FormattedMessage id="admin.manage-doctor.select-doctor"/></label>
//                 <Select
//                  value={this.state.selectedOption}
//                  onChange={this.handleChangeSelect}
//                  options={this.state.listDoctors}
//                  placeholder={'Chọn bác sĩ'}          
//                  />
//             </div>
//             <div className="content-right">
//                 <label> <FormattedMessage id="admin.manage-doctor.intro"/> </label>                
//                 <textarea className="form-control" 
//                 onChange={(event)=>{this.handleOnChangeDesc(event)}}
//                 value ={this.state.description}
//                 >
//                 </textarea>
//                 </div>
//             </div>
//             <div className="more-infor-extra row">
//                 <div className="col-4 form-group">
//                     <label> Chọn giá</label>
//                     <Select
//                     options={this.state.listPrice}
//                     placeholder={'Chọn giá'}
//                     />
//                 </div>
//                 <div className="col-4 form-group">
//                     <label> Chọn phương thức thanh toán</label>
//                     <Select
//                     options={this.state.listPayment}
//                     placeholder={'Chọn phương thức thanh toán'}
//                     />
//                 </div>
//                 <div className="col-4 form-group">
//                     <label> Chọn tỉnh thành</label>
//                     <Select
//                     options={this.state.listProvince}
//                     placeholder={'Chọn tỉnh thành'}
//                     />
//                 </div>
//                 <div className="col-4 form-group">
//                     <label>Tên phòng khám</label>
//                     <input className="form-control"/>                   
//                 </div>
//                 <div className="col-4 form-group">
//                     <label>Địa chỉ phòng khám</label>
//                     <input className="form-control"/>                   
//                 </div>
//                 <div className="col-4 form-group">
//                     <label>Note</label>
//                     <input className="form-control"/>                   
//                 </div>
//             </div>
//             <div className="manage-doctor-editor">
//              <MdEditor 
//                 style={{ height: '500px' }}
//                 renderHTML={text => mdParser.render(text)}
//                 onChange={this.handleEditorChange}
//                 value={this.state.contentMarkdown} />
            
//             </div>
//             <button 
//             onClick={()=>this.handleSaveContentMarkdown()}
//            className={hasOldData === true ? "save-content-doctor":"create-content-doctor"}> 
//             {hasOldData === true ?
//             <span><FormattedMessage id="admin.manage-doctor.save"/></span> 
//             :
//             <span> <FormattedMessage id="admin.manage-doctor.add"/></span>}
           
//             </button>
//            </div> 
//         );
//     }
// }
// const mapStateToProps = state => {
//     return {
//         language: state.app.language,
//         allDoctors:state.admin.allDoctors,
//         allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
//     };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         fetchAllDoctors: ()=>dispatch(actions.fetchAllDoctors()),
//         getAllRequiredDoctorInfor:()=>dispatch(actions.getRequiredDoctorInfor()),
//         saveDetailDoctor:(data)=>dispatch(actions.saveDetailDoctor(data))
        
//     };
// };
// export default connect(mapStateToProps,mapDispatchToProps)(ManageDoctor);

// ----------------------------------------------------------------
// import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import {connect} from 'react-redux';
// import './TableManageUser.scss';
// import * as actions from "../../../store/actions"
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import './ManageDoctor.scss';
// import 'react-markdown-editor-lite/lib/index.css';
// import Select from 'react-select';
// import {CRUD_ACTIONS,LANGUAGES} from '../../../utils';
// import { getDetailInfoDoctor } from '../../../services/userService';






// const mdParser = new MarkdownIt(/* Markdown-it options */);

// class ManageDoctor extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             contentMarkdown:'',
//             contentHTML: '',
//             selectedOption:'',
//             description: '',
//             listDoctors : [],
//             hasOldData: false
//         }
//     }
//     componentDidMount(){
//         this.props.fetchAllDoctors()
//     }
//     buildDataInputSelect = (inputData) => {
//         let result = [];
//         let {language}=this.props;
//         if(inputData && inputData.length > 0){
//             inputData.map((item,index) => {
//             let object = {};
//             let labelVi = `${item.lastName} ${item.firstName}`;
//             let labelEn = `${item.firstName} ${item.lastName}`;

//             object.label = language === LANGUAGES.VI ?  labelVi:labelEn;
//             object.value = item.id;
//             result.push(object);
//         })
//         }
        
//         return result;
//     }

//     componentDidUpdate(prevProps,prevState,snapshot) {
//         if (prevProps.allDoctors !== this.props.allDoctors){
//             let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
//             this.setState({
//                 listDoctors: dataSelect
//             })
//         }
//         if (prevProps.language !== this.props.language){
//             let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
//             this.setState({
//                 listDoctors: dataSelect
//             })
//         }
       
//     }
//     handleEditorChange = ({ html, text }) => {
//         this.setState({
//             contentMarkdown:text,
//             contentHTML: html,
//         })
   
//     }
//     handleSaveContentMarkdown = () =>{
//         let {hasOldData} = this.state;
//     this.props.saveDetailDoctor({
//         contentHTML: this.state.contentHTML,
//         contentMarkdown: this.state.contentMarkdown,
//         description:this.state.description,
//         doctorId:this.state.selectedOption.value,
//         action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
//     })
//     }
    
//     handleChangeSelect =async(selectedOption) => {
//     this.setState({ selectedOption });
//     let res = await getDetailInfoDoctor(selectedOption.value);
//     if (res && res.errCode === 0 && res.data.Markdown){
//         let markdown = res.data.Markdown;
//         this.setState ({
//             contentHTML:markdown.contentHTML,
//             contentMarkdown : markdown.contentMarkdown,
//             description : markdown.description,
//             hasOldData : true
//         })
//     }    else {
//         this.setState ({
//             contentHTML:'',
//             contentMarkdown:'',
//             description: '',
//             hasOldData: false
//         })
//     }
//   };

//   handleOnChangeDesc = (event)=>{
//     this.setState ({
//         description:event.target.value
//     })
//   }
//     render() {
//         let  {hasOldData} = this.state;
//         return (
//             <div className="manage-doctor-container">
//             <div className="manage-doctor-title">
//                  Tạo thêm thông tin Doctor 
//                  </div>
//             <div className="more-infor">
//                 <div className="content-left form-group">        
//                 <label> Chọn bác sĩ </label>
//                 <Select
//                  value={this.state.selectedOption}
//                  onChange={this.handleChangeSelect}
//                  options={this.state.listDoctors}               
//                  />
//             </div>
//             <div className="content-right">
//                 <label> Thông tin giới thiệu: </label>                
//                 <textarea className="form-control" rows="4"
//                 onChange={(event)=>{this.handleOnChangeDesc(event)}}
//                 value ={this.state.description}
//                 >
//                   hahahahaha
//                 </textarea>
//                 </div>
//             </div>
//             <div className="manage-doctor-editor">
//              <MdEditor 
//                 style={{ height: '500px' }}
//                 renderHTML={text => mdParser.render(text)}
//                 onChange={this.handleEditorChange}
//                 value={this.state.contentMarkdown} />
            
//             </div>
//             <button 
//             onClick={()=>this.handleSaveContentMarkdown()}
//            className={hasOldData === true ? "save-content-doctor":"create-content-doctor"}> 
//             {hasOldData === true ?
//             <span>Lưu thông tin</span> :<span> Tạo thông tin</span>}
           
//             </button>
//            </div> 
//         );
//     }
// }
// const mapStateToProps = state => {
//     return {
//         language: state.app.language,
//         allDoctors:state.admin.allDoctors
//     };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         fetchAllDoctors: ()=>dispatch(actions.fetchAllDoctors()),
//         saveDetailDoctor:(data)=>dispatch(actions.saveDetailDoctor(data))
        
//     };
// };
// export default connect(mapStateToProps,mapDispatchToProps)(ManageDoctor);