import React, { Component } from 'react'
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap'
import RenamePopover from './RenamePopover'

class CVToolbar extends Component {
  state = {
    deleteSelected: false,
    renameSelected: false,
  }

  deleteConfirmed() {
    this.setState({ deleteSelected: false })
    this.props.deleteConfirmed()
  }

  deleteClicked() {
    this.setState({ deleteSelected: true })
  }

  deleteCancelled() {
    this.setState({ deleteSelected: false })
  }

  renameConfirmed(newName) {
    this.setState({ renameSelected: false })
    this.props.renameConfirmed(newName)
  }

  render() {
    const DeletePopoverHeaderContents = () => {
      if (this.props.cvCount >= 2) {
        return 'Are you sure you want to delete the selected CV?'
      }
      return 'Deleting denied.'
    }

    const DeletePopoverBodyContents = () => {
      if (this.props.cvCount >= 2) {
        return (
          <div>
            <Button outline className="button" onClick={() => this.deleteConfirmed()}>Yes</Button>
            <Button outline className="button" onClick={() => this.deleteCancelled()}>No</Button>
          </div>
        )
      }
      return 'You cannot delete the only CV of a user.'
    }

    const DeletePopover = () => {
      return (
        <Popover placement="bottom" target={`delete${this.props.index}`} isOpen={this.state.deleteSelected} toggle={() => this.deleteCancelled()}>
          <PopoverHeader>
            <DeletePopoverHeaderContents />
          </PopoverHeader>
          <PopoverBody>
            <DeletePopoverBodyContents />
          </PopoverBody>
        </Popover>
      )
    }

    return (
      <div className="my-cvs-buttongroup">
        <Button outline className="button" id={`rename${this.props.index}`} onClick={() => this.setState({ renameSelected: true })}>Rename</Button>
        <Button outline className="button" onClick={() => this.props.goEdit()}>
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <Button outline className="button" onClick={() => this.props.copyClicked()}>
          <span className="fa fa-files-o" aria-hidden="true" />
        </Button>
        <Button id={`delete${this.props.index}`} outline className="button" onClick={() => this.deleteClicked()}>
          <span className="fa fa-trash-o" aria-hidden="true" />
        </Button>
        <DeletePopover />
        <RenamePopover
          index={this.props.index}
          renameSelected={this.state.renameSelected}
          renameCancelled={() => this.setState({ renameSelected: false })}
          renameConfirmed={newName => this.renameConfirmed(newName)}
        />
      </div>


    )
  }
}


export default CVToolbar