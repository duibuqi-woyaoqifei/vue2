const ncname = "[a-zA-Z_][\\w\\-\\.]*";
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配 <xxx
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配 </xxx>
const startTagClose = /^\s*(\/?)>/; // 匹配 <div> <br/>

// 对模板进行编译处理
export function parseHTML(html) {
  const ELEMENT_TYPE = 1;
  const TEXT_TYPE = 3;
  let stack = []; // 存放元素
  let currentParent, root;

  function createASTElement(tag, attrs) {
    return {
      tag,
      type: ELEMENT_TYPE,
      children: [],
      attrs,
      parent: null,
    };
  }

  function start(tag, attrs) {
    let node = createASTElement(tag, attrs);

    // 树为空则当前是树的根节点(第一次)
    if (!root) {
      root = node;
    }

    if (currentParent) {
      node.parent = currentParent;
      currentParent.children.push(node);
    }
    stack.push(node);
    currentParent = node;
  }
  function chars(text) {
    // 去除空格
    text = text.replace(/\s/g, "");

    // 文本存放当前节点
    text &&
      currentParent.children.push({
        type: TEXT_TYPE,
        text,
        parent: currentParent,
      });
  }
  function end(tag) {
    // 删除最后一个 ( 倒数第二个为最后一个的 parent )
    let node = stack.pop();

    currentParent = stack[stack.length - 1];
  }

  // 截取 html
  function advance(n) {
    html = html.substring(n);
  }

  // 解析开始标签返回 match 结果
  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);

      let tagClose, attr;
      while (!(tagClose = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
        advance(attr[0].length);
      }
      if (tagClose) {
        advance(tagClose[0].length);
      }
      return match;
    }

    return false;
  }
  while (html) {
    let textEnd = html.indexOf("<");

    // textEnd 等于 0 则为标签
    if (textEnd === 0) {
      // 匹配开始标签
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      // 匹配结束标签
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        end(endTagMatch[1]);
        advance(endTagMatch[0].length);
        continue;
      }
    }

    // textEnd > 0 则为文本内容
    if (textEnd > 0) {
      const text = html.substring(0, textEnd);
      if (text) {
        chars(text);
        advance(text.length);
      }
    }
  }
  return root
}