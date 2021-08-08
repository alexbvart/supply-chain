import React, { useEffect, useRef, useState } from 'react';
import PlainText from '../../../Hooks/PlainText';
import ReactToPrint from 'react-to-print';
import Mermaid from '../Mermeid';
import processS from './process.module.css'
import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';


function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram =
        $(go.Diagram,
            {
                'undoManager.isEnabled': true,  // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                'clickCreatingTool.archetypeNodeData': { text: 'new node', color: '#6462FC' },
                model: $(go.GraphLinksModel,
                    {
                        linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                        // positive keys for nodes
                        /*                         makeUniqueKeyFunction: (go.Model, data) => {
                                                    let k = data.key || 1;
                                                    while (m.findNodeDataForKey(k)) k++;
                                                    data.key = k;
                                                    return k;
                                                },
                                                // negative keys for links
                                                makeUniqueLinkKeyFunction: (go.GraphLinksModel, data) => {
                                                    let k = data.key || -1;
                                                    while (m.findLinkDataForKey(k)) k--;
                                                    data.key = k;
                                                    return k;
                                                } */
                    }),
                // when a drag-drop occurs in the Diagram's background, make it a top-level node
                mouseDrop: function (e) { finishDrop(e, null); },
                layout:  // Diagram has simple horizontal layout
                    $(go.GridLayout,
                        { wrappingWidth: Infinity, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1) }),
                "commandHandler.archetypeGroupData": { isGroup: true, text: "Group", horiz: false }
            });

    /* links */
    // relinking depends on modelData
    diagram.linkTemplate = $(
        go.Link,
        new go.Binding("relinkableFrom", "canRelink").ofModel(),
        new go.Binding("relinkableTo", "canRelink").ofModel(),
        new go.Binding("points", "pts").makeTwoWay(),
        $(go.Shape),
        $(go.Shape, { toArrow: "Standard" })
    );

    // The one template for Groups can be configured to be either layout out its members
    // horizontally or vertically, each with a different default color.

    function makeLayout(horiz) {  // a Binding conversion function
        if (horiz) {
            return $(go.GridLayout,
                {
                    wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                    cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                });
        } else {
            return $(go.GridLayout,
                {
                    wrappingColumn: 1, alignment: go.GridLayout.Position,
                    cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                });
        }
    }

    function defaultColor(horiz) {  // a Binding conversion function
        return horiz ? "#6462FC" : "#FAFAFC";
    }

    function defaultFont(horiz) {  // a Binding conversion function
        return horiz ? "bold 18px sans-serif" : "bold 16px sans-serif";
    }

    // this function is used to highlight a Group that the selection may be dropped into
    function highlightGroup(e, grp, show) {
        if (!grp) return;
        e.handled = true;
        if (show) {
            // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
            // instead depend on the DraggingTool.draggedParts or .copiedParts
            var tool = grp.diagram.toolManager.draggingTool;
            var map = tool.draggedParts || tool.copiedParts;  // this is a Map
            // now we can check to see if the Group will accept membership of the dragged Parts
            if (grp.canAddMembers(map.toKeySet())) {
                grp.isHighlighted = true;
                return;
            }
        }
        grp.isHighlighted = false;
    }

    // Upon a drop onto a Group, we try to add the selection as members of the Group.
    // Upon a drop onto the background, or onto a top-level Node, make selection top-level.
    // If this is OK, we're done; otherwise we cancel the operation to rollback everything.
    function finishDrop(e, grp) {
        var ok = (grp !== null
            ? grp.addMembers(grp.diagram.selection, true)
            : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
        if (!ok) e.diagram.currentTool.doCancel();
    }

    /* -------------------------- */

    diagram.groupTemplate =
        $(go.Group, "Auto",
            {
                background: "transparent",
                ungroupable: true,
                // highlight when dragging into the Group
                mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
                mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
                computesBoundsAfterDrag: true,
                // when the selection is dropped into a Group, add the selected Parts into that Group;
                // if it fails, cancel the tool, rolling back any changes
                mouseDrop: finishDrop,
                handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                // Groups containing Groups lay out their members horizontally
                layout: makeLayout(false)
            },
            new go.Binding("layout", "horiz", makeLayout),
            new go.Binding("background", "isHighlighted", function (h) {
                return h ? "#6562fc44" : "transparent";
            }).ofObject(),
            $(go.Shape, "Rectangle",
                { fill: null, stroke: defaultColor(false), strokeWidth: 2 },
                new go.Binding("stroke", "horiz", defaultColor),
                new go.Binding("stroke", "color")),
            $(go.Panel, "Vertical",  // title above Placeholder
                $(go.Panel, "Horizontal",  // button next to TextBlock
                    { stretch: go.GraphObject.Horizontal, background: defaultColor(false) },
                    new go.Binding("background", "horiz", defaultColor),
                    new go.Binding("background", "color"),
                    $("SubGraphExpanderButton",
                        { alignment: go.Spot.Right, margin: 5 }),
                    $(go.TextBlock,
                        {
                            alignment: go.Spot.Left,
                            editable: false,
                            margin: 5,
                            font: defaultFont(false),
                            opacity: 1,  // allow some color to show through
                            stroke: "#1A1A1C"
                        },
                        new go.Binding("font", "horiz", defaultFont),
                        new go.Binding("text", "text").makeTwoWay())
                ),  // end Horizontal Panel
                $(go.Placeholder,
                    { padding: 5, alignment: go.Spot.TopLeft })
            )  // end Vertical Panel
        );

    // define a simple Node template
    diagram.nodeTemplate =
        $(go.Node, 'Auto',  // the Shape will go around the TextBlock
            { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                mouseDrop: function (e, node) { finishDrop(e, node.containingGroup); }
            },
            { locationSpot: go.Spot.Center },
            $(go.Shape, "RoundedRectangle",
                {
                    fill: "#ACE600", stroke: null,
                    portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
                    // allow all kinds of links from and to this port
                    fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                    toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
                },
                new go.Binding("fill", "color")),
            $(go.TextBlock,
                {
                    margin: 8,
                    editable: false,
                    font: "bold 14px sans-serif",
                    opacity: 0.75,
                    stroke: "#1A1A1C"
                },
                new go.Binding("text", "text").makeTwoWay())
        );

    /* functions */
    function reexpand(e) {
        diagram.commit(function (diag) {
            var level = parseInt(document.getElementById("levelSlider").value);
            diag.findTopLevelGroups().each(function (g) { expandGroups(g, 0, level); })
        }, "reexpand");
    }
    function expandGroups(g, i, level) {
        if (!(g instanceof go.Group)) return;
        g.isSubGraphExpanded = i < level;
        g.memberParts.each(function (m) {
            expandGroups(m, i + 1, level);
        })
    }


    return diagram;
}

const initPalette = () => {
    const $ = go.GraphObject.make;
    const palette = $(go.Palette);
    return palette;
};

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) {
    /* alert('GoJS model changed!'); */
}

/* function initPalette() {
    const $ = go.GraphObject.make;

    let myPalette =
        $(go.Palette,
            {
                nodeTemplateMap: diagram.nodeTemplateMap,
                groupTemplateMap: diagram.groupTemplateMap
            });

    myPalette.model = new go.GraphLinksModel([
        { text: "lightgreen", color: "#ACE600" },
        { text: "yellow", color: "#FFDD33" },
        { text: "lightblue", color: "#33D3E5" },
        { isGroup: true, text: "H Group", horiz: true },
        { isGroup: true, text: "V Group", horiz: false }
    ]);
    return myPalette
} */

const ProcessMap = ({ processmap,processs }) => {

    const processToPalette= []

    const [process, setProcess] = useState(processmap)
    useEffect(() => {
        setProcess(processmap)
    }, [processmap])

    const strategicRef = useRef(null)
    const primaryRef = useRef(null)
    const supporttRef = useRef(null)

    const strategicPlainText = PlainText(process.strategic)
    const primaryPlainText = PlainText(process.primary)
    const supportPlainText = PlainText(process.support)

    const [stategicPT, setStategicPT] = useState(strategicPlainText)
    const [primaryPT, setPrimaryPT] = useState(primaryPlainText)
    const [supportPT, setsupportPT] = useState(supportPlainText)
    useEffect(() => {
        setStategicPT(PlainText(process.strategic))
        setPrimaryPT(PlainText(process.primary))
        setsupportPT(PlainText(process.support))
    }, [stategicPT, primaryPT, supportPT])
    console.log({processs})
    if(processs.length>0){
       processs.map(p => {
        let onep = {   
            'key': p._id,
            'text': p.name
        }
        processToPalette.push(onep)
     })
    }
    console.log(processToPalette)

    return (
        <>
            <h1>Process map </h1>
            <ReactToPrint
                trigger={() => <button ><p> Export</p></button>}
                content={() => strategicRef.current}
            />
            <section className={processS.process}>
               
                <div className={processS.first_col}><h2>Requerimiento del Cliente</h2> </div>
                <div className={processS.process_item}>
                <h3 className={processS.title}>Management processes</h3>
                    <ReactDiagram
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={[
                            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                            { key: 3, text: 'Delta', color: 'pink', loc: '150 150', group: 4 },
                            { key: 4, isGroup: true, text: "H Group", horiz: true },
                            { key: 5, isGroup: true, text: "V Group", horiz: false, group: 4 }
                        ]}
                        linkDataArray={[
                            { key: -1, from: 0, to: 1 },
                            { key: -2, from: 0, to: 2 },
                            { key: -3, from: 1, to: 1 },
                            { key: -4, from: 2, to: 3 },
                            { key: -5, from: 4, to: 0 }
                        ]}
                        onModelChange={handleModelChange}
                    />
                </div>
                <div className={processS.process_item}>
                <h2 className={processS.title}>Production processes</h2>
                    <ReactDiagram
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={[
                            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
                        ]}
                        linkDataArray={[
                            { key: -1, from: 0, to: 1 },
                            { key: -2, from: 0, to: 2 },
                            { key: -3, from: 1, to: 1 },
                            { key: -4, from: 2, to: 3 },
                            { key: -5, from: 3, to: 0 }
                        ]}
                        onModelChange={handleModelChange}
                    />
                </div>
                <div className={processS.process_item}>
                <h2 className={processS.title}>Support processess</h2>
                    <ReactDiagram
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={[
                            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150', "group": 2 },
                            { key: 3, text: 'Delta', color: 'pink', loc: '150 150', isGroup: true }
                        ]}
                        linkDataArray={[
                            { key: -1, from: 0, to: 1 },
                            { key: -2, from: 0, to: 3 },
                            { key: -3, from: 1, to: 1 },
                            { key: -4, from: 2, to: 3 },
                            { key: -5, from: 3, to: 2 }
                        ]}
                        onModelChange={handleModelChange}
                    />
                </div>
                <div className={processS.palette}>
                <ReactPalette
                    initPalette={initPalette}
                    divClassName={processS.process_item}
                    nodeDataArray={processToPalette}
                   
                />
                </div>
                <div className={processS.third_col}> <h2>Staisfaccion del Cliente</h2> </div>
            </section>
        </>
    );
}
export default ProcessMap;