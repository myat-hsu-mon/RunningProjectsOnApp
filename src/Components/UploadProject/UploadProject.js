import React, { Component } from 'react'
import axios from 'axios';
// var clearData = {
//     projectName : '',
//     academicYear : '',
//     language : '',
//     languageVersion : '',
//     databaseName : '',
//     databaseVersion : '',
//     projectFile : ''
// }
export default class UploadProject extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            projectName : '',
            academicYear : '2018-2019',
            language : 'nodejs',
            languageVersion : '',
            databaseName : 'mysql',
            databaseVersion : '',
            projectFile : null
        }
    }

    //Input
    handleOnChange =(e)=>{
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }

    //Select
    handleSelectionChange = (e) =>{
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }

    //File
    handleFileChange = (e) =>{
        console.log("Files",e.target.files);
            this.setState({
                ...this.state,
                projectFile : e.target.files
            })
    }

    handleOnSubmit = (e) =>{
        e.preventDefault();
        console.log("Uploaded project : ", this.state);
        console.log("Uploaded file:",this.state.projectFile)

        const formData = new FormData();

        //Stretch
        for(let file of Array.from(this.state.projectFile)){
            const filePath = file.webkitRelativePath;
            console.log("RelativePath: ",filePath)
            formData.append(filePath,file);
            console.log("Append successfully")

        }

        const data = {
            projectName : this.state.projectName,
            academicYear : this.state.academicYear,
            language : this.state.language,
            languageVersion :this.state.languageVersion,
            databaseName : this.state.databaseName,
            databaseVersion : this.state.databaseVersion,
        }
        console.log("Data: ",data)

        // formData.append(data);
        formData.append('project',JSON.stringify(data));

        axios({
            method : 'post',
            url:"http://localhost:4000/upload",
            data: formData,
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(()=>console.log("Successfully Uploaded"))
        .catch(()=>console.log("Unsuccessfully"))

    }

  
    render() {
        return (
            <div>
               <form onSubmit={this.handleOnSubmit}>
                   <label>Project Name : </label> 
                   <input type="text" name="projectName"  value={this.state.projectName} onChange={this.handleOnChange} /><br/><br/>


                   <label>Academic Year : </label>
                   <select value={this.state.academicYear} onChange={this.handleSelectionChange}>
                       <option value="2018-2019">2018-2019</option>
                       <option value="2019-2020">2019-2020</option>
                       <option value="2020-2021">2020-2021</option>
                   </select><br/><br/>


                   <label>Language : </label>
                   <select value={this.state.language} onChange={this.handleSelectionChange}>
                       <option value="nodejs">Node.js-Express</option>
                       <option value="spring">JavaEE-Spring</option>
                       <option value="laravel">PHP-Laravel</option>
                   </select><br/><br/>


                   <label>Language-version : </label>
                   <input type="text" name="languageVersion"  value={this.state.languageVersion} onChange={this.handleOnChange}/><br/><br/>


                   <label>Database Name : </label>
                   <select value={this.state.databaseName} onChange={this.handleSelectionChange}>
                       <option value="mysql">Mysql</option>
                       <option value="mongodb">MongoDB</option>
                   </select><br/><br/>


                   <label>Database-version : </label>
                   <input type="text" name="databaseVersion"  value={this.state.databaseVersion} onChange={this.handleOnChange}/><br/><br/>


                   <label>Project Folder</label>
                   <input type="file" onChange={this.handleFileChange} webkitdirectory="true" mozdirectory="true" /><br/><br/>


                   <button type="submit">Upload-Project</button>

               </form>
            </div>
        )
    }
}

