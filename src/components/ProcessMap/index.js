import React, { useEffect, useRef, useState } from 'react';
import PlainText from '../../../Hooks/PlainText';
import ReactToPrint from 'react-to-print';
import processS from './process.module.css'
import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';
import post from '../../../module/post';
import put from '../../../module/put';
import Button from '../Buton';
import CtaButton from '../CtaButton';
const ProcessMap = ({ processmap, processs, bu }) => {

    const diagramstrategicRef = useRef(null)
    const diagramprimaryRef = useRef(null)
    const diagramsupporttRef = useRef(null)
    const diagramExportRef = useRef(null)

    function initDiagram() {
        const $ = go.GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram =
            $(go.Diagram,
                {
                    'undoManager.isEnabled': true,  // must be set to allow for model change listening
                    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                    'clickCreatingTool.archetypeNodeData': { text: 'new process', color: '#96E3A3' },
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
/*                     layout:  
                        $(go.GridLayout,
                            { wrappingWidth: Infinity, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1) }), */
                    "commandHandler.archetypeGroupData": { isGroup: true, text: "Group", horiz: true } //aqui puse en true el horiz para que no se reodene de forma horizontal
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
            return horiz ? "#FAFAFC":"#6462FC" ;
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
                    /* layout: makeLayout(false) */
                },
                /* new go.Binding("layout", "horiz", makeLayout), */
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
                                editable: true,
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
                        fill: "#96E3A3", stroke: null,
                        portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
                        // allow all kinds of links from and to this port
                        fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
                    },
                    new go.Binding("fill", "color")),
                $(go.TextBlock,
                    {
                        margin: 8,
                        editable: true,
                        font: "bold 14px sans-serif",
                        opacity: 0.75,
                        stroke: "#1A1A1C"
                    },
                    new go.Binding("text", "text").makeTwoWay())
            );

        let slider = document.getElementById("levelSlider")
        slider.addEventListener('change', reexpand);
        slider.addEventListener('input', reexpand);


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

    function groupSelection(theRef) {
        const diagram = theRef.current.getDiagram();
        diagram.commandHandler.groupSelection();


        /*         if (theRef.current) {
                    const diagram = theRef.current.getDiagram();
                    if (diagram instanceof go.Diagram) {
                        diagram.commit(d => {
                            d.grid.visible = model.showGrid;
                        }, "Update prop");
                    }
                } */
    }

    const initPalette = () => {

        let diagram = initDiagram()
        console.log("hola", { diagram })

        const $ = go.GraphObject.make;

        const palette = $(go.Palette,
            {
                nodeTemplateMap: diagram.nodeTemplateMap,
                groupTemplateMap: diagram.groupTemplateMap
            });
        /* const palette = $(go.Palette); */
        return palette;
    };

    const MACRO_PROCESS = {
        strategic: {},
        primary: {},
        support: {}
    }

    const saveJsonDiagram = (theRef, type) => {
        const diagram = theRef.current.getDiagram();
        MACRO_PROCESS[type] = JSON.parse(diagram.model.toJson())
        theRef.current.isModified = false;
        console.log(MACRO_PROCESS)
    }
    const saveJsonDB = async () => {

        await saveJsonDiagram(diagramstrategicRef, "strategic")
        await saveJsonDiagram(diagramprimaryRef, "primary")
        await saveJsonDiagram(diagramsupporttRef, "support")

        const postData = {
            name: bu.nombre,
            'business-unitId': bu.id,
            strategic: MACRO_PROCESS["strategic"],
            primary: MACRO_PROCESS["primary"],
            support: MACRO_PROCESS["support"]
        }
        if (processmap.id) {
            const res = await put(`${process.env.NEXT_PUBLIC_SERVER_HOST}/process-map`, processmap.id, postData)
            console.log(res)
        } else {
            const res = await post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/process-map`, postData)
            console.log(res)
        }
        console.log({ processmap })
    }
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


    const processToPalette = []
    if (processs.length > 0) {
        processs.map(p => {
            let onep = {
                'key': p._id,
                'text': p.name
            }
            processToPalette.push(onep)
        })
    }

    return (
        <>
            <h1>Process map </h1>
            <br/>
            <section className={processS.process} ref={diagramExportRef}>

                <div className={processS.first_col}>
                    <h2>Requerimiento del Cliente</h2>
                </div>
                <div className={processS.process_item}>
                    <h3 className={processS.title}>Management processes</h3>
                    {/* {processmap.strategic && */}
                    <ReactDiagram
                        ref={diagramstrategicRef}
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={processmap.strategic.nodeDataArray.length > 0 ? processmap.strategic.nodeDataArray : []}
                        linkDataArray={processmap.strategic.linkDataArray.length > 0 ? processmap.strategic.linkDataArray : []}
                        onModelChange={handleModelChange}
                    />
                    {/* } */}
                    <Button
                        className={processS.float_left}
                        onClick={() => groupSelection(diagramstrategicRef)}>Group</Button>

                </div>
                <div className={processS.process_item}>
                    <h2 className={processS.title}>Production processes</h2>
                    {/* {processmap.primary && */}
                    <ReactDiagram
                        ref={diagramprimaryRef}
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={processmap.primary.nodeDataArray.length > 0 ? processmap.primary.nodeDataArray : []}
                        linkDataArray={processmap.primary.linkDataArray.length > 0 ? processmap.primary.linkDataArray : []}
                        onModelChange={handleModelChange}
                    />{/* } */}
                    <Button
                        className={processS.float_left}
                        onClick={() => groupSelection(diagramprimaryRef)}>Group</Button>

                </div>
                <div className={processS.process_item}>
                    <h2 className={processS.title}>Support processess</h2>
                    {/* {processmap.support && */}
                    <ReactDiagram
                        ref={diagramsupporttRef}
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={processmap.support.nodeDataArray.length > 0 ? processmap.support.nodeDataArray : []}
                        linkDataArray={processmap.support.linkDataArray.length > 0 ? processmap.support.linkDataArray : []}
                        onModelChange={handleModelChange}
                    />
                    {/*  } */}
                    <Button
                        className={processS.float_left}
                        onClick={() => groupSelection(diagramsupporttRef)}>Group</Button>

                </div>
                <div className={processS.palette}>
                    <ReactPalette
                        initPalette={initPalette}
                        divClassName={processS.process_item}
                        nodeDataArray={processToPalette}
                    />
                </div>
                <div className={processS.third_col}>
                    <h2>Staisfaccion del Cliente</h2>
                </div>
            </section>
            <footer className={processS.footer}>
                <input id="levelSlider" type="range" min="0" max="5" />
                <ReactToPrint
                    trigger={() => <CtaButton ><p> Export in PDF</p></CtaButton>}
                    content={() => diagramExportRef.current}
                />
                <CtaButton onClick={() => saveJsonDB()}>Save</CtaButton>
            </footer>
        </>
    );
}
export default ProcessMap;