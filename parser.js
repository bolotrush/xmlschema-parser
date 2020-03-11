/**********************************
 ******** Немножко Теории **********

 <xs:element name="" type="" default/fixed="" />  - простой элемент
 <xs:attribute name="" type="" default/fixed="" use="required" />

 <element name = "">
 <simpleType>
 <restriction base="xs:integer">
 <minInclusive value="" />
 <maxInclusive value="" />
 </restriction>
 </simpleType>
 </element>

 Составные элементы: 1) пустые 2)содержат другие элементы (как я понимаю, массив структур, например)
 3) содержат текст 4) 2)+3)

 <xs:element name="" type="personInfo"/>
 <xs:complexType name="personInfo">
 <xs:sequence> ---> декларированные поля должны быть в этом порядке!
 <xs:element name="firstname" type=""/>
 <xs:element name="secondname" type=""/>
 </xs:sequence>
 </xs:complexType>

 Тип может быть расширяем. Пусть есть <complexType name="personInfo">. Мы его используем, а для другого поля нужно тоже
 самое + еще пару полей
 Значит пишем новый <complexType>, где указываем доп поля + пишем: <extension base="personInfo">

 <xs:simpleContent> - текст и атрибуты. Добавляем тег после <complexType>, но до <extension/restriction>

 restrictions:
 enumeration - список приемлемых значений
 fractionDigits - максимальное число знаков после десятичной запятой
 length
 maxExclusive - верхняя граница для числовых значений (меньше указанного)
 maxInclusive - то же самое, но меньше или равно указанному
 maxLength
 minExclusive
 minInclusive
 minLength
 pattern - Точная последовательность приемлемых символов (регулярки для ограничения значения)
 totalDigits - точное количество допустимых цифр
 whiteSpace - способ обработки пробелов

 Индикаторы очередности:
 <xs:all> - ве дочерние в любом порядке только 1 раз
 <xs:choice> - какой-то один дочерний элемент. Либо то, либо другое
 <xs:sequence>

 Индикаторы частности - пишется В теге элемента:
 maxOccurs = "" - максимальное число появления элемента "unbounded"
 minOccurs = ""

 Индикаторы группирования:
 <xs:group name="">
 Внутри необходимо указать индикатор очередности и далее перечисояем элементы
 Потом в <complexType> обращаемся <xs:group ref="Имя группы">

 <xs:attributeGroup> - аналогично, но не надо указывать очередность

 Тег <xs:any/> - как "любой элемент" для расширения
 <xs:anyAttribute/>

 Замещение!
 <element name="name" type=""/>
 <element name="" substitutionGroup="name"/>
 Защита от замещения атрибут block в элементе

 ******************************************/

var oTypes = {};
var oElements = {};
var aAttributes = ["name", "type", "form", "minOccurs", "maxOccurs", "base", "value"]; //всевозможные атрибуты, что я придумала. Думала может использовать потом для indexOf, чтобы сразу определять, что за атрибут перед нами. Но пока не знаю

/***
 * Принимает на вход a NamedNodeMap (attribute list) containing the attributes of the selected node
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

function defineTag(node){

    var oRandomObject = {};

    switch(node.nodeName){

        case "xs:annotation":
            oRandomObject = tagAnnotation(node);
            break;

        case "xs:attribute":
            break;

        case "xs:element":
            break;

        case "xs:restriction":
            oRandomObject = tagRestriction(node)
            break;

        case "xs:complexType":
            break;

        case "xs:simpleType":
            break;

        case "xs:sequence":
            break;

        case "xs:all":
            break;

        case "xs:choice":
            break;

        case "xs:group":
            break;
    }

    return oRandomObject;
}
/***
 * Принимает на вход Node Annotation
 * Выводит вот этот текст-описание (вроде, как, я пока ничего не запускала и не проверяла. У меня даже HTML пока нет)
 ***/
function tagAnnotation(node) {

    var oComment = {};
    oComment["comment"] = node.getElementsByTagName("xs:documentation")[0].childNodes[0].nodeValue;
    return(oComment);
}

function tagElement(node) {

    var oElement = {};
    var oAttributes = getAttributes(node.attributes);
    var aChild = [];
    for (var i=0; i<node.childNodes.length; i++) {

        aChild.push(defineTag(node.childNodes[i]))
    }


}

function ruleOfOrder() {
    //sequence choice all
}

/***
 * Принимает на вход Node Restriction
 * Выводит объект с информацией о родительском теге, на чем базируется ограничение и объект ограничений (ограничение(название тега) - значение)
 ***/
function tagRestriction(node) {

    var oRestriction = {};
    oRestriction ["parentTag"] = node.parentNode.nodeName;
    oRestriction["parentName"] = node.parentNode.getAttribute('name');
    oRestriction["base"] = node.getAttribute('base');
    oRestriction["restrictions"] = {};
    for (var i=0; i<node.childNodes.length; i++) {
        oRestriction["restrictions"][node.childNodes[i].nodeName] = node.childNodes[i].attributes[0].value;
    }

    return oRestriction;
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

