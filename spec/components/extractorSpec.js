import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from 'qili-app/spec/components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "qili-app/spec/db/helper"

import extract from "../../lib/extractor"
import Docx from "docx4js"
import {selector} from "qili-app"

describe("docx extractor", function(){
    beforeEach(function(){
        let file=require("./extractor/template.docx")
        let parsed=this.parsed=extract(file)
    })
    it("can output html with table(tr,td),paragraph, link, and image without styles", function(){
        let {parsed:{knowledge}}=this
            ,{html}=knowledge

         expect(html).toMatch(/<html>.*<\/html>/ig)
         expect(html).toMatch(/<table>.*<\/table>/ig)
         expect(html).toMatch(/<tr>.*<\/tr>/ig)
         expect(html).toMatch(/<td>.*<\/td>/ig)
         expect(html).toMatch(/<p>.*<\/p>/ig)
         expect(html).toMatch(/<img\s+.*\s+\/>/ig)
         expect(html).not.toMatch(/style=".*"/ig)
         expect(html).not.toMatch(/class=".*"/ig)
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
