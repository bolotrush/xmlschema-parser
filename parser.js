var oTypes = {};
var oElements = {};
var aAttributes = ["name", "type", "form", "minOccurs", "maxOccurs", "base", "value", "ref", "substitutionGroup", "default", "fixed", "nillable"]; //всевозможные атрибуты, что я придумала. Думала может использовать потом для indexOf, чтобы сразу определять, что за атрибут перед нами. Но пока не знаю

/***
 * Принимает на вход a NamedNodeMap - attribute list, containing the attributes of the selected node
 * Выводит объект формата {имя атрибута1: значение атрибута1, имя атрибута2: значение атрибута2}
 ***/
function getAttributes(attributes) {
    if (attributes == null || attributes === []) {

        return 0;
    }
    var oAttributes = {};
    for (var i=0; i<attributes.length; i++){

        oAttributes[attributes.name] = attributes.value;
    }
    return oAttributes;
}

/***
 * Принимает на вход какую-то Node и в зависимости от значения тега начинает обработчик
 * Выводит объект
 ***/
function defineTag(node){

    var oRandomObject = {};

    switch(node.nodeName){

        case "xs:annotation":
            oRandomObject = tagAnnotation(node);
            break;

        case "xs:attribute":
            break;

        case "xs:element":
            oRandomObject = tagElement(node);
            break;

        case "xs:restriction":
            oRandomObject = tagRestriction(node);
            break;

        case "xs:complexType":

            oRandomObject = tagType(node);
            break;

        case "xs:simpleType":

            oRandomObject = tagType(node);
            break;

        case "xs:complexContent":
            break;

        case "xs:simpleContent":
            break;

        //sequence, all & choice - индикаторы очерёдности. Не уверена, что их требуется обрабатывать
        case "xs:sequence":

            oRandomObject = tagFilling(node);
            break;

        case "xs:all":

            oRandomObject = tagFilling(node);
            break;

        case "xs:choice":

            oRandomObject = tagFilling(node);
            break;

        case "xs:group":
            break;
    }

    return oRandomObject;
}

function readExternalType(node) {

    var aComplexTypes = node.getElementsByTagName("xs:complexType");
    var aSimpleTypes = node.getElementsByTagName("xs:simpleType");
    var typeName = "";
    var i=0;
    var j=0;
    for (i; i<aComplexTypes.length; i++){

        typeName = aComplexTypes[i].getAttribute('name');
        oTypes[typeName] = {};
        for (j; j<aComplexTypes[i].childNodes.length; j++) {
            //надо сделать так, чтобы был объект {typeName: {имя тега дитя: {инфа о нём}, имя тега дитя: {инфа о нём}, имя тега дитя: {инфа о нём}}}
            oTypes[typeName][aComplexTypes[i].childNodes[j].nodeName] = defineTag(aComplexTypes[i].childNodes[j]);
        }
    }
    for (i=0; i<aSimpleTypes.length; i++){

        typeName = aSimpleTypes[i].getAttribute('name');
        oTypes[typeName] = {};
        for (j=0; j<aSimpleTypes[i].childNodes.length; j++) {
            //надо сделать так, чтобы был объект typeName = {имя тега дитя: {инфа о нём}, имя тега дитя: {инфа о нём}, имя тега дитя: {инфа о нём}}
            oTypes[typeName][aSimpleTypes[i].childNodes[j].nodeName] = defineTag(aSimpleTypes[i].childNodes[j]);
        }
    }
}


/***
 * Думаю, что здесь будет вход
 * ***/
function parser(xsd) {

    //oTypes = defineTag()
    var aComplexTypes = xsd.getElementsByTagName("xs:complexType");
    for (var i=0; i<aComplexTypes.length; i++) {
        getAttributes(aComplexTypes[i].attributes);
        for (var j=0; j<aComplexTypes[i].childNodes.length; j++){
            switch (aComplexTypes[i].childNodes[j]) {



            }
        }


    }
    var aSimpleTypes = xsd.getElementsByTagName("xs:simpleType");
}

