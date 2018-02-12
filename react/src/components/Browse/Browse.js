import React, { Component } from 'react'
import SearchAndExport from './SearchAndExport'
import NameList from './NameList'
import CVList from './CVList'
import './Browse.css'
import '../Header.css'
import { loadCV, loadUserList, loadCVList, copyCV, deleteCV, renameCV } from '../Api'
import Preview from '../Preview'

class Browse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      userIDList: [],
      selectedUserIndex: 0,
      cvList: [],
      selectedCVIndex: 0,
      cvContents: '',
    }
    this.updateUserList()
  }


  updateUserList = () => {
    const defaultUserIndex = 0
    loadUserList()
      .then((users) => {
        this.setState({ userList: users, userIDList: users.map(user => user.username) })
        this.userClicked(users, defaultUserIndex)
      })
      .catch(err => console.log(err))
  }

  userClicked(userList = this.state.userList, userIndex) {
    const defaultCVIndex = 0
    this.setState({ selectedUserIndex: userIndex })
    const username = userList[userIndex].username
    loadCVList(username)
      .then((cvs) => {
        this.setState({ cvList: cvs })
        this.cvClicked(username, cvs, defaultCVIndex)
      })
      .catch(err => console.log(err))
  }

  cvClicked(username = this.state.userIDList[this.state.selectedUserIndex],
    cvList = this.state.cvList, cvIndex) {
    this.setState({ selectedCVIndex: cvIndex })
    loadCV(username, cvList[cvIndex])
      .then((cv) => {
        this.setState({ cvContents: cv })
      })
      .catch(err => console.log(err))
  }

  renameConfirmed(cvName, newCVName) {
    const username = this.state.userIDList[this.state.selectedUserIndex]
    console.log(`new cv name: ${newCVName}`)
    renameCV(username, cvName, newCVName)
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOfRenamedCV = cvs.indexOf(newCVName)
            this.cvClicked(username, cvs, indexOfRenamedCV)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  copyClicked(cvName) {
    const username = this.state.userIDList[this.state.selectedUserIndex]
    copyCV(username, cvName)
      .then((nameOfCopiedCV) => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOfCopiedCV = cvs.indexOf(nameOfCopiedCV)
            this.cvClicked(username, cvs, indexOfCopiedCV)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  deleteConfirmed(cvName) {
    const username = this.state.userIDList[this.state.selectedUserIndex]
    deleteCV(username, cvName)
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOutOfBounds = this.state.selectedCVIndex >= cvs.length
            const newSelectedCVIndex = (
              indexOutOfBounds ? (cvs.length - 1) : this.state.selectedCVIndex
            )
            this.cvClicked(username, cvs, newSelectedCVIndex)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
    const user = this.state.userList.length === 0 ? [] : [this.state.userList[0]]
    return (
      <div>
        <SearchAndExport
          fetchPDF={() => this.props.fetchPDF(
            this.state.userIDList[this.state.selectedUserIndex],
            this.state.cvList[this.state.selectedCVIndex])}
          view={this.props.view}
          changeViewName={this.props.changeViewName}
          updateUserList={() => this.updateUserList()}
        />
        <div id="namelist" className="browse-section">
          <NameList
            userList={this.props.view === 'browse' ? this.state.userList : user}
            selectedUserIndex={this.state.selectedUserIndex}
            userClicked={userIndex => this.userClicked(undefined, userIndex)}
          />
        </div>
        <div id="cvlist" className="browse-section">
          <CVList
            userList={this.state.userIDList}
            selectedUserIndex={this.state.selectedUserIndex}
            cvList={this.state.cvList}
            selectedCVIndex={this.state.selectedCVIndex}
            cvClicked={cvIndex => this.cvClicked(undefined, undefined, cvIndex)}
            goEdit={cvName => this.props.goEdit(
              this.state.userIDList[this.state.selectedUserIndex],
              cvName)}
            renameConfirmed={(cvName, newCVName) => this.renameConfirmed(cvName, newCVName)}
            copyClicked={cvName => this.copyClicked(cvName)}
            deleteConfirmed={cvName => this.deleteConfirmed(cvName)}
            cvCount={this.state.cvList.length}
          />
        </div>
        <div className="CVpreview">
          <Preview
            username={this.state.userIDList[this.state.selectedUserIndex]}
            text={this.state.cvContents}
          />
        </div>
      </div>

    )
  }
}

export default Browse