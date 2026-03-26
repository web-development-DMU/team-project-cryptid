export function viewProfile(user) {
    return `
        <main class="d-flex">
            <div id="side-l" class="d-flex">
                <!-- This may not be used at all -->
                <h1 id="page-username">"My Profile"</h1>
                <br>
                <section class="border border-2 border-dark rounded">
                    <h3>Items Showcase</h3>
                    <div id="container-item-showcase">
                        <div class="favourite-item">
                            <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
                        </div>
                        <div class="favourite-item">
                            <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
                        </div>
                        <div class="favourite-item">
                            <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
                        </div>
                        <div class="favourite-item">
                            <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
                        </div>
                        <div class="favourite-item">
                            <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
                        </div>
                    </div>
                </section>
                <br><br>
                <section class="border border-2 border-dark rounded">
                    <h3>All Items</h3>
                    <div id="container-all-items" class="item-grid"></div>
                </section>
            </div>
            <!-- this side will be placed first when page collapses -->
            <div id="side-r" class="d-flex">
                <div class="container-profile">
                    <img id="profile-picture" class="rounded-circle" src="/assets/profile-placeholder.jpg" alt="User's profile picture">
                    <!-- This button will be replaced with an image of a pencil for "edit" -->
                    <input type="button" id="change-pfp-btn" class="profile-addition border border-1 border-dark rounded-circle" value="Change">
                    <p id="level-display" class="profile-addition border border-1 border-dark rounded-circle">27</p>
                </div>
                <div id="container-user-details">
                    <p id="username">${user?.username || "Guest"}</p>
                    <textarea id="bio" class="border border-2 border-dark rounded">About Me</textarea>
                </div>
                <div id="container-btns">
                    <input type="button" id="edit-profile-btn" class="border border-1 border-dark rounded" value="Edit Profile">
                    <input type="button" id="save-changes" class="border border-1 border-dark rounded" value="Save Changes">
                </div>
            </div>
        </main>
    `;
}