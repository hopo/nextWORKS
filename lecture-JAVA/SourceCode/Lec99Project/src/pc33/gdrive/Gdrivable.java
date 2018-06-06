package pc33.gdrive;

import javafx.scene.control.TextArea;

interface Gdrivable {
	
	/*
	 *  using gdrive command
	 */

	public void list(TextArea textArea);
	public void download(String Id, String downloadPath);
	public void upload(String filePath);

}
