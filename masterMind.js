

		//INIT VARIABLES GLOBALES
		 var tabChoixCouleur=['black','blue','green','red','yellow','white'];
		 var compteurManches=0;//on declar un compteur pour savoir si le j1 a deja atteint les 12 lignes ou non
		 var tabIdDiv_1=['divChiffre','divIndic','divEssai'];
		 var combiMystere=[];
		 var tabCheck=[]; //tab qui check si les pions mis par le j1 corrspondent ou non à la combi mystère
		 //var permettant de savoi si les div de selection sont remplis ou non
		 var nbManchesPossibles=10;

		 //objs divs de selection et tableau checkant si sont remplis ou non
		 var divSelect0=document.getElementById('divSelect0');
		 var divSelect1=document.getElementById('divSelect1');
		 var divSelect2=document.getElementById('divSelect2');
		 var divSelect3=document.getElementById('divSelect3');
		 divSlctRempli=[false,false,false,false];
		 //st utilisés dans la page html et fcts ci-dessous----------------------------------------------------------------------------------------------------------









function initPartie(objSectionSelect,objBoutonJouer,objBoutonValider){
	//affichage boutons de jeu ::masqués au début :: 
	//tous les éléments d'interaction hormis le bouton jouer sont masqués au début
	objSectionSelect.style.visibility="hidden";
	objBoutonJouer.style.visibility="visible";
	objBoutonValider.style.visibility="hidden";

	//REMISE A ZERO DE TOUS DIV Selections ET VARIABLES  : on vide tous les div de selection si une nouvelle partie est lancée :
	//mise a zero des divs et check selection
	document.getElementById('divSelect0').style.backgroundColor="";
	document.getElementById('divSelect1').style.backgroundColor="";
	document.getElementById('divSelect2').style.backgroundColor="";
	document.getElementById('divSelect3').style.backgroundColor="";
	for(i=0;i<4;i++){
		divSlctRempli[i]=false;            
	}
	//mise à zero de compteurManches
	compteurManches=0;	
}


//APPELLE QUAND ON CLIQUE SUR BOUTON LANCER LA PARTIE
function debutPartie(objSectionSelect,objBoutonJouer,objBoutonValider,objSectionMystere,tab){

	//faire apparaitre les deux boutons du jeu : valider et abandonner ainsi que le choix des couleurs
	objSectionSelect.style.visibility="visible";
	//et on fait disparaitre le bouton jouer
	objBoutonJouer.style.visibility="hidden";
	///on masque le bouton valider afin d'éviter de jouer sans avoir rempli les quatre cases du joueur
	objBoutonValider.style.visibility="hidden";
	objSectionMystere.style.visibility="hidden";


	//mise à zéro des div pions feedback au cas ou si une nouvelle partie est lancée. Ne se fait que dans un deuxième tps par rapport au reste des divs et variables afin de permttre au joueur de voir l'histoirique de la partie précédente
	for(i=0;i<nbManchesPossibles;i++){
		for(j=0;j<4;j++){

			document.getElementById(tabIdDiv_1[1]+i+'_'+j).style.backgroundColor="";
			document.getElementById(tabIdDiv_1[2]+i+'_'+j).style.backgroundColor="";
		}
	}		
	//appel combinaison à formuler pour lancer le jeu
	generationCombiMystere(tab); 

	//explications règles mastermind
	alert('Au cours de la partie, vous devez trouver une combinaison de couleurs générée par l\'ordi. Pour cela choisissez vos couleurs et cliquez sur chaque cercle vide situés en haut de l\'écran. \nUne fois les quatre cercles remplis d\'une couleur, un bouton \'Valider\' apparaîtra afin de poursuivre le jeu.\nBonne chance')
}



function finPartie(etatPartie){
	switch(etatPartie){
		case "gagne":
			alert('Félicitation, vous avez trouvé la combinaison. Appuyez sur "ok" pour la voir');
		break;

		case "perd":
			alert('Pas de chance, le nombre d\'essai maximal est atteint. Appuyez sur "ok" pour voir la combinaison' );
		break;

		case "abandon":
			alert('Vous avez fait le choix d\'abandonner la partie. Veuillez cliquer sur ok pour voir la combinaison mystère qui était à trouver');
		break;
	}
	afficherCombiMystere();
	//on réinit tout comme au chargement de la page : avec effacement des élements interaction hormis le bouton Jouer qui lui réapparait
	initPartie(document.getElementsByTagName('section')[1],document.getElementsByTagName('button')[0],document.getElementsByTagName('button')[2]);
}

//APPELLE QUAND ON CLIQUE SUR BOUTON ABANDONNER
function abandonPartie(){
	finPartie("abandon");
}







function resetManche(){
//on reset les couleurs des divs selectionnés, on fait disapraitre le bouton valider et le checkRemplissage des divs
	document.getElementById('divSelect0').style.backgroundColor="";
	document.getElementById('divSelect1').style.backgroundColor="";
	document.getElementById('divSelect2').style.backgroundColor="";
	document.getElementById('divSelect3').style.backgroundColor="";

	//bouton valider
	document.getElementsByTagName('button')[2].style.visibility='hidden';

	for(i=0;i<4;i++){
		divSlctRempli[i]=false;
	}
}


function miseAjourColonne2(){
	//on prend le tabCheck[] et en fct du résultat, on assigne soit un pion N/B ou aucun aux cases de la colonne 2
	//pion Blanc==Case du Joueur et combiMystere sont les mêmes
	//pion Noir==Case du joueur et combiMystere ne sont pas les memes, mais la couleur du joueur est quand même présente ds la combiMystere
	//et enfin si il y a rien alors ni la position ni la couleur n'est bonne

	//on recupere aussi le tabIdDiv_1 pour cibler les cases et lignes de la colonne 2
	for(i=0;i<4;i++){
		if(tabCheck[i]=="V"){
			document.getElementById(tabIdDiv_1[1]+compteurManches+'_'+i).style.backgroundColor="white";
		}
		else if(tabCheck[i]=="P")
			document.getElementById(tabIdDiv_1[1]+compteurManches+'_'+i).style.backgroundColor="black";
	}
}

function consequencesManche(){
	//on met ensuite à jour les pions témoins des manches (colonne 2, pions B/N ou rien)
	miseAjourColonne2();

	//on met à jour  le nb de manches et les valeurs interactions de la partie:
	if(tabCheck[0]=='V' && tabCheck[1]=='V' && tabCheck[2]=='V' && tabCheck[3]=='V'){
		finPartie('gagne');

	}
	else if((compteurManches==nbManchesPossibles) && (tabCheck[0]!='V' || tabCheck[1]!='V' || tabCheck[2]!='V' || tabCheck[3]!='V')){
		finPartie('perd');
	}
	else{
		compteurManches++;
		resetManche();//on renitialise pour commencer une nouvelle manche
	}
}









//APPELLE PAR LE DEBUT DE PARTIE
function generationCombiMystere(tab){
	//var locales
	var tabCouleur=[];
	var x;
	var max=5;
	var min=0;

//on prend une couleur au pif parmi les 6
	for(i=0;i<tab.length;i++){
		  x=Math.floor((Math.random()*max-min)+1); //nb aleatoir entre 0 et 5, les 6 couleurs possibles
		  tabCouleur[i]=tab[x];
	}
//on met la couleur dans chaque "case" du tableau globale qu'est combiMystere
	for(i=0;i<4;i++){
		combiMystere[i]=tabCouleur[i];
		console.log(combiMystere[i]);
	}
	
}



function afficherCombiMystere(){
	var objSectionMystere=document.getElementsByTagName('section')[2];
	objSectionMystere.style.visibility="visible";
	for(i=0;i<4;i++){
		objSectionMystere.getElementsByTagName('div')[i].style.backgroundColor=combiMystere[i];
	}
}


//Au SURVOL DES DIVS SELECTION
function choixCouleur(tabIDcouleur,objBoutonValider){
//fct qui permet d'appliquer la couleur choisie par bouton radio sur le div cliqué

	//tableau local ou on stocke l'objet radio de chaque couleur
	tabCouleur=[];
	 //objs divs de selection et tableau checkant si sont remplis ou non
	var divSelect0=document.getElementById('divSelect0');
    var divSelect1=document.getElementById('divSelect1');
	var divSelect2=document.getElementById('divSelect2');
	var divSelect3=document.getElementById('divSelect3');


    //on appelle divSlctRempli pour informer que les divs de selection sont soit rempli par une couleur ou non
	for(i=0;i<tabIDcouleur.length;i++){
		tabCouleur[i]=document.getElementById('radioCouleur_'+tabIDcouleur[i]);
	}
		//on utilise les id des divsSlect pour mettre à jour les couleurs
		$("#divSelect0").click(function(){

			for(i=0;i<tabCouleur.length;i++){
				 if(tabCouleur[i].checked){       
					  divSelect0.style.backgroundColor=tabCouleur[i].value;
					  divSlctRempli[0]=true;
				 }
				}
			});	
		$("#divSelect1").click(function(){

				for(i=0;i<tabCouleur.length;i++){
					if(tabCouleur[i].checked){       
					   divSelect1.style.backgroundColor=tabCouleur[i].value;
					   divSlctRempli[1]=true;
				 }
				}
			});	
		$("#divSelect2").click(function(){

				for(i=0;i<tabCouleur.length;i++){
					if(tabCouleur[i].checked){       
					    divSelect2.style.backgroundColor=tabCouleur[i].value;
					    divSlctRempli[2]=true;
				 }
				}
			});	
		$("#divSelect3").click(function(){

				for(i=0;i<tabCouleur.length;i++){
				     if(tabCouleur[i].checked){       
					     divSelect3.style.backgroundColor=tabCouleur[i].value;
					     divSlctRempli[3]=true; 
				 }
				}
			});	

		//et on appelle la fct validerSelectionCOULEUR pour afficher le bouton valider
		//attention celui-ci ne s'afffche que si l'entièreté des cases joueurs sont remplis*
		if(divSlctRempli[0]==true && divSlctRempli[1]==true && divSlctRempli[2]==true && divSlctRempli[3]==true){
			objBoutonValider.style.visibility="visible";
		}
		else{
			objBoutonValider.style.visibility="hidden";
		}
}


//QUAND ON CLIQUE SUR BOUTON VALIDER
function applicCouleur(tabIdDiv){
	//applique juste les couleurs aux cases du tableau à chaque tour joué
	//on appelle la var globale compteurManches
	//les id des divsSelect
	//les id des divs dans la grille
	for(i=0;i<4;i++){
		document.getElementById(tabIdDiv[2]+compteurManches+'_'+i).style.backgroundColor=document.getElementById('divSelect'+i).style.backgroundColor;
		//console.log(tabIdDiv[2]+compteurManches+'_'+i);
	}
}
function comparCombinaison(){
	//on appelle compteurManches pour se situer dans la grille
	//on compare chaque case du combiMystere au cases de couleur selectionnés
	//on utilise un tableau tabCheck (déclaré en globale) afin de retenir en fct de l'index, si chaque case correspond ou non aux celles mystere
	//les trois tableaux déclarés en globales

	//on laisse l'index 2 pour tabIdDiv_1 car l'idée est de cibler les cases se trouvant dans la derniere colonne à savoir #divEssai
	//cela donne #divEssaii_j
	alert('yo');

	for(i=0;i<4;i++){

		tabCheck[i]="F";
		//premier cas : la case mystere correpsond à la couleur et la position de la case J1. En ce sens, on met dans tabCheck : V pour Vrai
		if(combiMystere[i]==document.getElementById(tabIdDiv_1[2]+compteurManches+'_'+i).style.backgroundColor){
			tabCheck[i]="V";
		}
		else{
			for(j=0;j<4;j++){
				console.log(tabIdDiv_1[2]+compteurManches+'_'+j);
				//deuxième cas : la case J1 a une couleur présente dans la combi mais dont la position n'est pas la bonne; on met un P pour Présent
				if(combiMystere[j]==document.getElementById(tabIdDiv_1[2]+compteurManches+'_'+i).style.backgroundColor){
					tabCheck[i]="P";
				}
			}
		}

	}
	consequencesManche();//appel fct qui met à jour éléments dans la page en fct des résultats du J1
	for(i=0;i<4;i++){
		console.log(tabCheck[i]);
	}
}	






			


		



	

