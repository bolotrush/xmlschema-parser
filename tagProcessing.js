/***
 * Принимает на вход Node Annotation
 * Выводит вот этот текст-описание (вроде, как, я пока ничего не запускала и не проверяла. У меня даже HTML пока нет)
 ***/
function tagAnnotation(node) {

    var oComment = {};
    oComment["tag"] = "annotation";
    oComment["comment"] = node.getElementsByTagName("xs:documentation")[0].childNodes[0].nodeValue;
    return(oComment);
}

/***
 * Принимает на вход Node Element
 * Выводит объект с информацияей об атрибутах и массивом объектов вложенных тегов
 ***/
function tagElement(node) {

    var oElement = {};
    oElement["tag"] = "element";
    oElement["attributes"] = getAttributes(node.attributes);
    oElement["children"] = [];
    for (var i=0; i<node.childNodes.length; i++) {

        oElement["children"].push(defineTag(node.childNodes[i]))
    }
    return oElement;
}

/***
 * Принимает на вход Node Restriction
 * Выводит объект с на чем базируется ограничение и объект ограничений (ограничение(название тега) - значение)
 ***/
function tagRestriction(node) {

    var oRestriction = {};
    oRestriction["base"] = node.getAttribute('base');
    oRestriction["restrictions"] = {};
    for (var i=0; i<node.childNodes.length; i++) {

        if (node.childNodes[i].nodeName === "xs:sequence" || node.childNodes[i].nodeName === "xs:all" || node.childNodes[i].nodeName === "xs:choice") {
            oRestriction["children"] = [];
            var childNode = node.childNodes[i];
            for (var j = 0; j < childNode.childNodes.length; j++) {

                oRestriction["children"].push(defineTag(childNode.childNodes[j]))
            }
        } else {

            oRestriction["restrictions"][node.childNodes[i].nodeName] = node.childNodes[i].attributes[0].value;
        }
    }

    return oRestriction;
}

/***
 * Принимает на вход node - индикатор очередности (sequence, all  или choice)
 * Выводит объект с информацией о дочерних элементах в виде массива объектов
 ***/
function tagFilling(node) {

    var oFilling = {};
    var tagName = node.nodeName.slice(3); //отрезаем xs:
    oFilling[tagName] = [];
    for (var i=0; i<node.childNodes.length; i++) {

        oFilling[tagName].push(defineTag(node.childNodes[i]));
    }
    return oFilling;
}