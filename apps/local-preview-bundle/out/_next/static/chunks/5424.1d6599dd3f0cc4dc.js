"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5424,6003],{35424:function(e,t,n){n.r(t),n.d(t,{default:function(){return a}});var r=n(16003);let i=Object.freeze({displayName:"SPARQL",fileTypes:["rq","sparql","sq"],name:"sparql",patterns:[{include:"source.turtle"},{include:"#query-keyword-operators"},{include:"#functions"},{include:"#variables"},{include:"#expression-operators"}],repository:{"expression-operators":{match:"(?:\\|\\||&&|=|!=|<|>|<=|>=|\\*|/|\\+|-|\\||\\^|\\?|\\!)",name:"support.class.sparql"},functions:{match:"\\b(?i:concat|regex|asc|desc|bound|isiri|isuri|isblank|isliteral|isnumeric|str|lang|datatype|sameterm|langmatches|avg|count|group_concat|separator|max|min|sample|sum|iri|uri|bnode|strdt|uuid|struuid|strlang|strlen|substr|ucase|lcase|strstarts|strends|contains|strbefore|strafter|encode_for_uri|replace|abs|round|ceil|floor|rand|now|year|month|day|hours|minutes|seconds|timezone|tz|md5|sha1|sha256|sha384|sha512|coalesce|if)\\b",name:"support.function.sparql"},"query-keyword-operators":{match:"\\b(?i:define|select|distinct|reduced|from|named|construct|ask|describe|where|graph|having|bind|as|filter|optional|union|order|by|group|limit|offset|values|insert data|delete data|with|delete|insert|clear|silent|default|all|create|drop|copy|move|add|to|using|service|not exists|exists|not in|in|minus|load)\\b",name:"keyword.control.sparql"},variables:{match:"(?<!\\w)[?$]\\w+",name:"constant.variable.sparql.turtle"}},scopeName:"source.sparql",embeddedLangs:["turtle"]});var a=[...r.default,i]},16003:function(e,t,n){n.r(t),n.d(t,{default:function(){return r}});var r=[Object.freeze({displayName:"Turtle",fileTypes:["turtle","ttl","acl"],name:"turtle",patterns:[{include:"#rule-constraint"},{include:"#iriref"},{include:"#prefix"},{include:"#prefixed-name"},{include:"#comment"},{include:"#special-predicate"},{include:"#literals"},{include:"#language-tag"}],repository:{boolean:{match:"\\b(?i:true|false)\\b",name:"constant.language.sparql"},comment:{match:"#.*$",name:"comment.line.number-sign.turtle"},integer:{match:"[+-]?(?:\\d+|[0-9]+\\.[0-9]*|\\.[0-9]+(?:[eE][+-]?\\d+)?)",name:"constant.numeric.turtle"},iriref:{match:'<[^\\x20-\\x20<>"{}|^`\\\\]*>',name:"entity.name.type.iriref.turtle"},"language-tag":{captures:{1:{name:"entity.name.class.turtle"}},match:"@(\\w+)",name:"meta.string-literal-language-tag.turtle"},literals:{patterns:[{include:"#string"},{include:"#numeric"},{include:"#boolean"}]},numeric:{patterns:[{include:"#integer"}]},prefix:{match:"(?i:@?base|@?prefix)\\s",name:"keyword.operator.turtle"},"prefixed-name":{captures:{1:{name:"storage.type.PNAME_NS.turtle"},2:{name:"support.variable.PN_LOCAL.turtle"}},match:"(\\w*:)(\\w*)",name:"constant.complex.turtle"},"rule-constraint":{begin:'(rule:content) (""")',beginCaptures:{1:{patterns:[{include:"#prefixed-name"}]},2:{name:"string.quoted.triple.turtle"}},end:'"""',endCaptures:{0:{name:"string.quoted.triple.turtle"}},name:"meta.rule-constraint.turtle",patterns:[{include:"source.srs"}]},"single-dquote-string-literal":{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.turtle"}},end:'"',endCaptures:{0:{name:"punctuation.definition.string.end.turtle"}},name:"string.quoted.double.turtle",patterns:[{include:"#string-character-escape"}]},"single-squote-string-literal":{begin:"'",beginCaptures:{0:{name:"punctuation.definition.string.begin.turtle"}},end:"'",endCaptures:{1:{name:"punctuation.definition.string.end.turtle"},2:{name:"invalid.illegal.newline.turtle"}},name:"string.quoted.single.turtle",patterns:[{include:"#string-character-escape"}]},"special-predicate":{captures:{1:{name:"keyword.control.turtle"}},match:"\\s(a)\\s",name:"meta.specialPredicate.turtle"},string:{patterns:[{include:"#triple-squote-string-literal"},{include:"#triple-dquote-string-literal"},{include:"#single-squote-string-literal"},{include:"#single-dquote-string-literal"},{include:"#triple-tick-string-literal"}]},"string-character-escape":{match:"\\\\(x\\h{2}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.|$)",name:"constant.character.escape.turtle"},"triple-dquote-string-literal":{begin:'"""',beginCaptures:{0:{name:"punctuation.definition.string.begin.turtle"}},end:'"""',endCaptures:{0:{name:"punctuation.definition.string.end.turtle"}},name:"string.quoted.triple.turtle",patterns:[{include:"#string-character-escape"}]},"triple-squote-string-literal":{begin:"'''",beginCaptures:{0:{name:"punctuation.definition.string.begin.turtle"}},end:"'''",endCaptures:{0:{name:"punctuation.definition.string.end.turtle"}},name:"string.quoted.triple.turtle",patterns:[{include:"#string-character-escape"}]},"triple-tick-string-literal":{begin:"```",beginCaptures:{0:{name:"punctuation.definition.string.begin.turtle"}},end:"```",endCaptures:{0:{name:"punctuation.definition.string.end.turtle"}},name:"string.quoted.triple.turtle",patterns:[{include:"#string-character-escape"}]}},scopeName:"source.turtle"})]}}]);