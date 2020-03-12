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
            break;

        case "xs:simpleType":
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

/***
 * Думаю, что здесь будет вход
 * ***/
function parser(xsd) {

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

