// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('firstplugin.helloWorld', function () {
		// активен ли текст. редактор
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
		  return;
		}
	
		// текст из блокнота
		const document = editor.document;
		const documentText = document.getText();
	
		// регулярка для чисел
		const numberRegex = /\b\d+\b/g;
	
		// Проходим по всем числам в тексте
		let result;
		let ranges = [];
		while ((result = numberRegex.exec(documentText))) {
		  const number = parseInt(result[0]);
		  const isEven = number % 2 === 0;
	
		  // определение индексов для подсветки
		  const beginPos = document.positionAt(result.index);
		  const endPos = document.positionAt(result.index + result[0].length);
		  const range = new vscode.Range(beginPos, endPos);
	
		  // опредеям стиль подсветки в зависимости от четности числа
		  const decorationType = vscode.window.createTextEditorDecorationType({
			color: isEven ? 'red' : 'yellow'
		  });
	
		  // добавляем в список индексы подсветки и стиль подсветки
		  ranges.push({ range, decorationType });
		}
	
		// применяем подсветку к индексам
		ranges.forEach(({ range, decorationType }) => {
		  editor.setDecorations(decorationType, [range]);
		});
	  });
	
	  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
