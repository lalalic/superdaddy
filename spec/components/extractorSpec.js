import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from 'qili-app/spec/components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "qili-app/spec/db/helper"

import extract from "../../lib/extractor"
import {selector} from "qili-app"

import {newDocx} from "../file"

describe("docx extractor", function(){
    fdescribe("identification", function(){
        it("paragraph,text", function(done){
            let content=`<w:p><w:r><w:t>hello world</w:t></w:r></w:p>`
            extract(newDocx(content)).then((ex)=>{
                let {knowledge}=ex
                    ,{content:html}=knowledge
                 expect(html).toMatch(/<p>hello world<\/p>/ig)
                 done()
             }).catch(failx(done))
        })

        it("table, tr, td", function(done){
            let content=`<w:tbl>
            <w:tblGrid>
				<w:gridCol w:w="2952"/>
			</w:tblGrid>
            <w:tr>
                <w:tc>
                <w:p><w:r><w:t>hello world</w:t></w:r></w:p>
                </w:tc>
            </w:tr>
            </w:tbl>`
            extract(newDocx(content)).then(({knowledge:{content:html}})=>{
                 expect(html).toMatch(/<table><tr><td><p>hello world<\/p><\/td><\/tr><\/table>/ig)
                 done()
             }).catch(failx(done))
        })

        it("image", function(done){
            let content=` `;
            extract(newDocx(content)).then(({knowledge:{content:html}})=>{
                 expect(html).toMatch(/<img/ig)
                 done()
             }).catch(failx(done))
        })

        it("link", function(){

        })
    })

    it("can extract properties[]", function(){

    })

    it("can upload to remote", function(){

    })

    it("can upload even with photos", function(){

    })

    it("can clear resorce", function(){

    })
})
