import React, { Component } from 'react'
import BrowseButtonGroup from './BrowseButtonGroup'
import NavBar from '../NavBar'
import NameList from './NameList'
import CVList from './CVList'
import ExampleCV from '../ExampleCV.png'
import './BrowseApp.css'
import '../NavBar.css'

class BrowseApp extends Component {
  constructor(props) {
    super(props)
    const testCVs = ['CV 1', 'CV 2', 'CV 3']
    const testUsers = ['Maija Meikäläinen', 'Heikki Heikäläinen', 'Mikko Mallikas']
    const testUser = 0
    this.state = {
      exportDropDownOpen: false,
      userList: testUsers,
      selectedUser: testUser,
      allCVs: testUsers.map(() => testCVs.slice()), // slice() copies array. only for testing
      cvList: testCVs,
      selectedCV: 0,
      deleteSelected: false,
      renameSelected: false,
      renameFieldContents: '',
    }
  }

  // only for testing. will probably be removed later.
  updateAllCVs() {
    this.state.allCVs[this.state.selectedUser] = this.state.cvList
  }

  userClicked(index) {
    this.setState({
      selectedUser: index,
      cvList: this.state.allCVs[index],
      selectedCV: 0,
    })
  }

  cvClicked(index) {
    this.setState({ selectedCV: index })
  }

  copyClicked() {
    const newCvName = 'copy of '.concat(this.state.cvList[this.state.selectedCV])
    this.state.cvList.push(newCvName)
    this.updateAllCVs()
    this.forceUpdate() // to force rerender
  }

  deleteClicked() {
    this.setState({ deleteSelected: true })
  }

  deleteConfirmed() {
    this.state.cvList.splice(this.state.selectedCV, 1)
    this.updateAllCVs()
    this.setState({ deleteSelected: false, selectedCV: 0 })
  }

  deleteCancelled() {
    this.setState({ deleteSelected: false })
  }

  renameClicked() {
    this.setState({ renameSelected: true })
  }

  renameFieldEdited(newContents) {
    this.setState({ renameFieldContents: newContents })
  }

  renameConfirmed() {
    this.state.cvList[this.state.selectedCV] = this.state.renameFieldContents
    this.updateAllCVs()
    this.setState({ renameSelected: false, renameFieldContents: '' })
  }

  renameCancelled() {
    this.setState({ renameSelected: false, renameFieldContents: '' })
  }

  exportClicked() {
    this.setState({ exportDropDownOpen: !this.state.exportDropDownOpen })
  }

  render() {
    return (
      <div>
        <header id="navbar">
          <NavBar />
        </header>
        <div id="buttons">
          <BrowseButtonGroup
            exportDropdownOpen={this.state.exportDropDownOpen}
            copyClicked={() => this.copyClicked()}
            deleteClicked={() => this.deleteClicked()}
            deleteConfirmed={() => this.deleteConfirmed()}
            deleteCancelled={() => this.deleteCancelled()}
            renameClicked={() => this.renameClicked()}
            renameConfirmed={() => this.renameConfirmed()}
            renameCancelled={() => this.renameCancelled()}
            exportClicked={() => this.exportClicked()}
            deleteSelected={this.state.deleteSelected}
            renameSelected={this.state.renameSelected}
            renameFieldContents={this.state.renameFieldContents}
            renameFieldEdited={newContents => this.renameFieldEdited(newContents)}
            cvCount={this.state.cvList.length}
          />
        </div>
        <div id="namelist" className="browseSection">
          <NameList
            selectedUser={this.state.selectedUser}
            userList={this.state.userList}
            userClicked={index => this.userClicked(index)}
          />
        </div>
        <div className="lineContainer" id="lineContainer">
          <div className="line" />
        </div>
        <div id="cvlist" className="browseSection">
          <CVList
            selectedCV={this.state.selectedCV}
            cvList={this.state.cvList}
            cvClicked={index => this.cvClicked(index)}
          />
        </div>
        <div className="CVpreview">
          <img src={ExampleCV} height="726" width="533" alt="First page of an example CV" />
        </div>
        <div className="lineContainer">
          <div className="line" />
        </div>
      </div>
    )
  }
}

export default BrowseApp
