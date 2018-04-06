<?php
	$conexao = mysql_connect("localhost","root","") or die ("Sem conexao com o banco");
	$db = mysql_select_db("db_volare");
		
	class conexao{
		public function typeDelete($query){
			mysql_query($query);
		}
		public function typeSelect($query){
			$query = mysql_query($query);
			while($array = mysql_fetch_row($query)){
				$novo_array[] = $array;
			}
			if(!empty($novo_array)){
				return $novo_array;
			}
		}
		public function typeInsert($query){
			mysql_query($query);
		}
		public function typeAlter($query){
			mysql_query($query);
		}
	}
?>