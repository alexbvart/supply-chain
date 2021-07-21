import React, { useEffect, useContext, useState, forwardRef } from 'react';
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
    themeCSS: `
    g.classGroup rect {
        fill: #282a36;
        stroke: #6272a4;
    } 
    g.classGroup text {
        fill: #f8f8f2;
    }
    g.classGroup line {
        stroke: #f8f8f2;
        stroke-width: 0.5;
    }
    .classLabel .box {
        stroke: #21222c;
        stroke-width: 3;
        fill: #21222c;
        opacity: 1;
    }
    .classLabel .label {
        fill: #f1fa8c;
    }
    .relation {
        stroke: #ff79c6;
        stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
        fill: #bd93f9;
        stroke: #bd93f9;
        stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
        fill: #21222c;
        stroke: #50fa7b;
        stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
        fill: #00bcd4;
        stroke: #00bcd4;
        stroke-width: 1;
    } 
    #extensionStart, #extensionEnd {
        fill: #f8f8f2;
        stroke: #f8f8f2;
        stroke-width: 1;
    }`,
    fontFamily: "Fira Code",
    flowchart: {
        useMaxWidth: false,
        htmlLabels: true
    },
});



const Mermaid = forwardRef(({ chart, className },ref) => {

    useEffect(() => {
        var output = document.getElementById('output');

        mermaid.render('theGraph', chart, function (svgCode) {
            output.innerHTML = svgCode;
        });
        return () => {    }
    }, [chart])

    return (
        <>
                <div className={`${className} mermaid`} id="output" ref={ref}>
                    {chart}
                </div>
            
        </>
    )
});
export default Mermaid