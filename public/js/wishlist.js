async function toggleLike(event, btn, listingId) {
    event.preventDefault();
    event.stopPropagation();

    // UI Elements
    const icon = btn.querySelector('i');
    const isLiked = icon.classList.contains('fa-solid');

    // Optimistic UI Update
    if (isLiked) {
        // Unlike
        icon.classList.remove('fa-solid', 'text-red-500');
        icon.classList.add('fa-regular');
        btn.classList.remove('text-red-500');
        btn.classList.add('text-white/70'); // Default validation style, might need adjustment specific to page
        // For show page specifically it might be text-gray-500
        if (btn.classList.contains('text-red-500')) {
            btn.classList.remove('text-red-500');
        }
    } else {
        // Like
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'text-red-500');
        btn.classList.add('text-red-500');
    }

    try {
        const response = await fetch(`/users/wishlist/${listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.redirected || response.status === 401) {
            window.location.href = '/login';
            return;
        }
    } catch (err) {
        console.error("Wishlist toggle error", err);
        // Revert on error - simplified for now
        location.reload();
    }
}

async function removeFromWishlist(event, btn, listingId) {
    event.preventDefault();
    event.stopPropagation();

    if (!confirm("Remove from wishlist?")) return;

    try {
        const response = await fetch(`/users/wishlist/${listingId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const card = btn.closest('a') || btn.closest('.group');
            if (card) card.remove();

            // Check if empty and show message? 
            // For now simplest is reload to update counts but removing element is smoother
            const wishlistContainer = document.querySelector('#wishlist .grid');
            if (wishlistContainer && wishlistContainer.children.length === 0) {
                location.reload();
            }
        }
    } catch (e) {
        console.error("Error removing", e);
    }
}
