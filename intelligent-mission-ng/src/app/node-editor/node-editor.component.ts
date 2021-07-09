import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {Node} from 'vis-network/standalone';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.css']
})
export class NodeEditorModal implements OnInit {
  public action = 'Add';
  public editableItem: Node;
  public entry: Node;

  constructor(public activeModal: NgbActiveModal) { 
    this.editableItem = {};
  }

  ngOnInit(): void {
    if (this.entry) {
      this.action = 'Update'; 
      this.editableItem = _.cloneDeep(this.entry);
    } 
  }

  save() {
    //TODO: validation
    this.activeModal.close(this.editableItem);
  }
}
