document.addEventListener("DOMContentLoaded", function () {
    let cartCount = 0; // Nombre d'articles dans le panier

    // Mettre à jour le total en tenant compte de la quantité initiale
    const updateTotal = () => {
        let total = 0;
        document.querySelectorAll(".card").forEach(card => {
            let quantity = parseInt(card.querySelector(".quantity").textContent);
            let unitPrice = parseInt(card.querySelector(".unit-price").textContent.replace(" $", ""));
            total += quantity * unitPrice;
        });
        document.querySelector(".total").textContent = total + " $";
    };

    // Mettre à jour le nombre d'articles dans le panier
    const updateCartCount = () => {
        document.getElementById("cart-count").textContent = cartCount;
    };

    // Initialiser la quantité à 1 pour chaque article
    document.querySelectorAll(".quantity").forEach(quantitySpan => {
        cartCount += parseInt(quantitySpan.textContent);  // Ajoute la quantité initiale de chaque article au total du panier
    });
    updateCartCount();

    document.querySelectorAll(".fa-plus-circle").forEach(button => {
        button.addEventListener("click", function () {
            let quantitySpan = this.nextElementSibling;
            let card = this.closest(".card");
            let unitPrice = parseInt(card.querySelector(".unit-price").textContent.replace(" $", ""));
            let totalElement = document.querySelector(".total");
            let currentTotal = parseInt(totalElement.textContent.replace(" $", ""));
            
            quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
            cartCount++;  // Ajouter un article dans le panier
            totalElement.textContent = (currentTotal + unitPrice) + " $";
            updateCartCount(); // Mise à jour du nombre d'articles dans le panier
        });
    });

    document.querySelectorAll(".fa-minus-circle").forEach(button => {
        button.addEventListener("click", function () {
            let quantitySpan = this.previousElementSibling;
            let card = this.closest(".card");
            let unitPrice = parseInt(card.querySelector(".unit-price").textContent.replace(" $", ""));
            let totalElement = document.querySelector(".total");
            let currentTotal = parseInt(totalElement.textContent.replace(" $", ""));
            
            if (parseInt(quantitySpan.textContent) > 1) {  // S'assurer qu'on ne passe pas en dessous de 1
                quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
                cartCount--;  // Retirer un article du panier
                totalElement.textContent = (currentTotal - unitPrice) + " $";
                updateCartCount(); // Mise à jour du nombre d'articles dans le panier
            }
        });
    });

    document.querySelectorAll(".fa-trash-alt").forEach(button => {
        button.addEventListener("click", function () {
            let card = this.closest(".card");  // Trouver la carte parent qui contient tout
            let quantity = parseInt(card.querySelector(".quantity").textContent);
            let unitPrice = parseInt(card.querySelector(".unit-price").textContent.replace(" $", ""));
            let totalElement = document.querySelector(".total");
            let currentTotal = parseInt(totalElement.textContent.replace(" $", ""));
            
            // Mise à jour du total en prenant en compte la quantité de l'article
            totalElement.textContent = (currentTotal - (quantity * unitPrice)) + " $";
            
            // Retirer tous les articles de la carte du panier
            cartCount -= quantity;
            updateCartCount(); // Mise à jour du nombre d'articles dans le panier

            // Supprimer toute la carte (image, prix, quantité, etc.)
            card.remove();
        });
    });

    document.querySelectorAll(".fa-heart").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("text-danger");
        });
    });

    updateTotal();
});
