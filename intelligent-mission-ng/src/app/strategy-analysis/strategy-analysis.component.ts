import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdentityInfo } from 'app/shared/shared';
import { ToasterService } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MIApiService, IdentityInfoService } from 'app/services/services';
import { Subscription } from 'rxjs';
// import {DataSet } from 'vis-data';
import { DataSet, Data, Node, Edge, Network, Options } from 'vis-network/standalone';
import { VisEdge, VisNode } from '../shared/vis';
import { Morphism } from 'app/shared/morphism';
import { MorphicNode } from 'app/shared/morphicNode';
// import { VisNetworkService, Options } from 'ngx-vis';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpenDirOptions } from 'fs';
// import { Options } from 'ngx-vis';
import { NodeEditorModal } from '../node-editor/node-editor.component'

@Component({
  selector: 'app-strategy-analysis',
  moduleId: module.id,
  templateUrl: './strategy-analysis.component.html'
})
export class StrategyAnalysisComponent implements OnInit, OnDestroy {
  public busy: Subscription;
  public identityInfo: IdentityInfo

  public visNetwork: string = 'networkId1';
  public visData: Data;
  public visNetworkOptions: Options
  public nodes: DataSet<Node>;
  public edges: DataSet<Edge>;
  public editableNode: Node;
  public editableEdge: Edge;
  public analysisResult: string [];
  public objectiveNode: string;
  // private edges: Array<Morphism>;
  // private nodes: Array<MorphicNode>;

  constructor(
    private modal: NgbModal,
    private miApi: MIApiService,
    // private visNetworkService: Network,
    private fb: FormBuilder,
    public toastr: ToasterService,
    identityService: IdentityInfoService) { 
      this.identityInfo = identityService.info;
      this.editableNode = {
        id: '',
        label: '',
        group: ''
      };
      this.editableEdge = {
        id: '',
        from: '',
        to: ''
      };

    }

  ngOnInit(): void {
    //this.busy = this.miApi.getStrategyAnalysisResults().subscribe((data: any) => this.files = data);
    var that = this;
    this.nodes = new DataSet<Node>([
      { id: '1', label: 'Node 1', group: 'event' },
      { id: '2', label: 'Node 2', group: 'action' },
      { id: '3', label: 'Node 3', group: 'event' },
      { id: '4', label: 'Node 4', group: 'action' },
      { id: '5', label: 'Node 5', group: 'action', title: 'Title of Node 5' }
    ]);
    this.edges = new DataSet<Edge>([
      { from: '1', to: '2' },
      { from: '1', to: '3' },
      { from: '2', to: '4' },
      { from: '2', to: '5' }
    ]);
    this.visData = { nodes: this.nodes, edges: this.edges };
    //this.visNetworkService.setData(this.visNetwork, )
    this.visNetworkOptions = {
      nodes: {
        shape: "dot",
        size: 20,
        font: {
          size: 15,
          color: "#ffffff"
        },
        borderWidth: 2
      },
      edges: {
        arrows: "to"
      },
      groups: {
        event: {
          color: { background: "red", border: "white" },
          shape: "diamond"
        },
        action: {
          shape: "icon",
          icon: {
            face: "FontAwesome",
            code: "\uf0c0",
            size: 50,
            color: "orange"
          }
        }
      },
      manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: function(data, callback) {
          // filling in the popup DOM elements
          that.addNode(data, callback);
        },
        addEdge: true,
        editNode: function(data, callback) {
          that.updateNode(data, callback);
        },
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        controlNodeStyle:{
          // all node options are valid.
        }
        // addNode: function(data, callback) {
        //   // filling in the popup DOM elements
        //   document.getElementById("node-operation").innerHTML = "Add Node";
        //   editNode(data, clearNodePopUp, callback);
        // },
        // editNode: function(data, callback) {
        //   // filling in the popup DOM elements
        //   document.getElementById("node-operation").innerHTML = "Edit Node";
        //   editNode(data, cancelNodeEdit, callback);
        // },
        // addEdge: function(data, callback) {
        //   if (data.from == data.to) {
        //     var r = confirm("Do you want to connect the node to itself?");
        //     if (r != true) {
        //       callback(null);
        //       return;
        //     }
        //   }
        //   document.getElementById("edge-operation").innerHTML = "Add Edge";
        //   editEdgeWithoutDrag(data, callback);
        // },
        // editEdge: {
        //   editWithoutDrag: function(data, callback) {
        //     document.getElementById("edge-operation").innerHTML = "Edit Edge";
        //     editEdgeWithoutDrag(data, callback);
        //   }
        // }
      }
    };
    var container = document.getElementById('networkId1');
    console.log(this.visData);
    var network = new Network(container, this.visData, this.visNetworkOptions);
  }

  public ngOnDestroy(): void {
    // this.visNetworkService.off(this.visNetwork, 'click');
  }

  public networkInitialized(): void {
    // now we can use the service to register on events
    // this.visNetworkService.on(this.visNetwork, 'click');

    // // open your console/dev tools to see the click params
    // this.visNetworkService.click.subscribe((eventData: any[]) => {
    //   if (eventData[0] === this.visNetwork) {
    //     console.log(eventData[1]);
    //   }
    // });
  }

  addNode(node, callback) {
    try {
      this.modal.open(NodeEditorModal).result.then(result => {
        callback(result);
      }, reason => reason);     
        // this.visNetworkService.fit(this.visNetwork);
    }
    catch (err) {
        alert(err);
        throw err;
    }
  }

  updateNode(node, callback) {
      try {
        this.editableNode = node;
        let modalRef = this.modal.open(NodeEditorModal);
        modalRef.componentInstance.entry = this.editableNode;
        modalRef.result.then(result => {
          callback(result);
        }, reason => callback(null));        
        
      }
      catch (err) {
          alert(err);
          throw err;
      }
  }

  removeNode(nodeId) {
      try {
          this.nodes.remove({id: nodeId});
      }
      catch (err) {
          alert(err);
          throw err;
      }
  }

  updateEdge(edge) {
      try {
          this.edges.update({
              id: edge.id,
              from: edge.from,
              to: edge.to
          });
      }
      catch (err) {
          alert(err);
          throw err;
      }
  }
  
  analyze() {
    // var morphicNodes = this.visData.nodes.map<MorphicNode>((item, id) => new MorphicNode(item) );
    // var morphisms = this.visData.edges.map<Morphism>((item, id) => new Morphism(item));
    // let morphicWebGraph = {
    //   directed: true,
    //   multigraph: false,
    //   nodes: morphicNodes,
    //   links: morphisms
    // };
    // var target = this.objectiveNode;
    // this.busy = this.miApi.analyzeMorphicWeb(morphicWebGraph, target).subscribe(result => {
    //   this.analysisResult = result as any;
    // })
  }
  

  

}
